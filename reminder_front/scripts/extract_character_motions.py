"""Extract the approved motion frames from the character storyboards.

The storyboard artwork is never redrawn or recolored. This script only crops the
existing loop frames and removes the connected near-white board background so
the original pixels can be layered over the room scene.
"""

from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "characters"
OUTPUT_DIR = SOURCE_DIR / "motions"

# All boxes are (left, top, right, bottom) in the original 1536 x 1024 boards.
# Each row shares a fixed vertical range so the bounce/jump offsets stay intact.
FRAME_BOXES = {
    "cream-bunny": {
        "bounce": [
            (650, 824, 744, 943),
            (744, 824, 816, 943),
            (816, 824, 900, 943),
        ],
        "walk": [
            (922, 824, 998, 943),
            (998, 824, 1069, 943),
            (1069, 824, 1160, 943),
        ],
        "wave": [
            (1198, 824, 1290, 943),
            (1290, 824, 1365, 943),
            (1365, 824, 1455, 943),
        ],
    },
    "lavender-cat": {
        "bounce": [
            (620, 790, 704, 936),
            (704, 790, 790, 936),
            (790, 790, 890, 936),
        ],
        "walk": [
            (898, 790, 989, 936),
            (989, 790, 1078, 936),
            (1078, 790, 1165, 936),
        ],
        "tail": [
            (1198, 790, 1294, 936),
            (1294, 790, 1390, 936),
            (1390, 790, 1492, 936),
        ],
    },
    "sprout-bird": {
        "bounce": [
            (590, 814, 686, 958),
            (686, 814, 790, 958),
            (790, 814, 885, 958),
        ],
        "walk": [
            (910, 814, 992, 958),
            (992, 814, 1075, 958),
            (1075, 814, 1168, 958),
        ],
        "wave": [
            (1208, 814, 1308, 958),
            (1308, 814, 1402, 958),
            (1402, 814, 1500, 958),
        ],
    },
}

# The sprout bounce row starts four pixels below the tail of the storyboard's
# MOTIONS heading. Keep the crop geometry stable and clear only that accidental
# top-edge overlap; the character and its intentional motion marks start lower.
TOP_EDGE_CLEAR_ROWS = {
    ("sprout-bird", "bounce"): 4,
}


def is_board_background(pixel: tuple[int, int, int, int]) -> bool:
    """Match only the neutral, very light paper surrounding each drawing."""

    red, green, blue, _ = pixel
    return min(red, green, blue) >= 232 and max(red, green, blue) - min(red, green, blue) <= 18


def clear_connected_background(image: Image.Image) -> Image.Image:
    """Make border-connected storyboard paper transparent without touching art."""

    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    queue: deque[tuple[int, int]] = deque()
    visited = bytearray(width * height)

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(1, height - 1):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        offset = y * width + x
        if visited[offset]:
            continue
        visited[offset] = 1
        if not is_board_background(pixels[x, y]):
            continue

        red, green, blue, _ = pixels[x, y]
        pixels[x, y] = (red, green, blue, 0)

        if x > 0:
            queue.append((x - 1, y))
        if x + 1 < width:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y + 1 < height:
            queue.append((x, y + 1))

    return rgba


def clear_top_edge(image: Image.Image, row_count: int) -> Image.Image:
    """Remove known storyboard-heading pixels without changing sprite artwork."""

    if row_count <= 0:
        return image

    cleaned = image.copy()
    pixels = cleaned.load()
    for y in range(min(row_count, cleaned.height)):
        for x in range(cleaned.width):
            red, green, blue, _ = pixels[x, y]
            pixels[x, y] = (red, green, blue, 0)
    return cleaned


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for character_id, motions in FRAME_BOXES.items():
        board = Image.open(SOURCE_DIR / f"{character_id}-board.png").convert("RGBA")
        for motion_name, boxes in motions.items():
            top_edge_rows = TOP_EDGE_CLEAR_ROWS.get((character_id, motion_name), 0)
            for frame_number, box in enumerate(boxes, start=1):
                frame = clear_connected_background(board.crop(box))
                frame = clear_top_edge(frame, top_edge_rows)
                output_path = OUTPUT_DIR / f"{character_id}-{motion_name}-{frame_number}.png"
                frame.save(output_path, optimize=True)
                print(output_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
