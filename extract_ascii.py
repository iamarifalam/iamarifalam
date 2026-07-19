"""
Extract ASCII particle data from profile_square.jpg
Preserves actual photo colors (skin tones, hair, suit) with a shadow-boost
so that the face looks realistic and recognizable against the dark background.
"""
import json
from PIL import Image

def extract_ascii(image_path, output_path, canvas_size=400, font_size=6):
    img = Image.open(image_path).convert('RGBA')
    
    # Scale image to fit canvas with 82% coverage
    scale = 0.82
    img_aspect = img.width / img.height
    
    draw_height = canvas_size * scale
    draw_width = draw_height * img_aspect
    
    if draw_width > canvas_size * scale:
        draw_width = canvas_size * scale
        draw_height = draw_width / img_aspect
    
    offset_x = (canvas_size - draw_width) / 2
    offset_y = (canvas_size - draw_height) / 2
    
    # Resize image to target draw dimensions
    resized = img.resize((int(draw_width), int(draw_height)), Image.LANCZOS)
    pixels = resized.load()
    
    # ASCII character set from sparse to dense  
    chars = " .:-=+*#%@"
    
    col_gap = font_size * 0.65
    row_gap = font_size * 1.0
    
    particles = []
    
    y_pos = 0
    while y_pos < draw_height:
        x_pos = 0
        while x_pos < draw_width:
            px = min(int(x_pos), resized.width - 1)
            py = min(int(y_pos), resized.height - 1)
            
            r, g, b, a = pixels[px, py]
            
            # Skip transparent
            if a < 100:
                x_pos += col_gap
                continue
            
            # Aggressively skip red background
            is_red_bg = (r > 120 and g < 90 and b < 90 and r > g * 1.4 and r > b * 1.4)
            if is_red_bg:
                x_pos += col_gap
                continue
            
            # Calculate brightness (0–1)
            brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
            
            # Map brightness to ASCII character (darker = denser)
            char_idx = min(int(brightness * (len(chars) - 1)), len(chars) - 1)
            char = chars[char_idx]
            
            # Skip whitespace characters
            if char == ' ':
                x_pos += col_gap
                continue
            
            # Preserve original colors
            pr, pg, pb = r, g, b
            
            # Boost brightness if too dark to ensure visibility on dark background
            if brightness < 0.25:
                boost = 0.25 / max(0.01, brightness)
                boost = min(2.5, boost) # Cap boost factor
                pr = min(255, int(r * boost))
                pg = min(255, int(g * boost))
                pb = min(255, int(b * boost))
                
                # Make sure it has some color instead of being pure black
                if pr < 40 and pg < 40 and pb < 40:
                    pr, pg, pb = 40, 48, 65 # dark slate blue fallback
            
            # Alpha: ensure visibility
            alpha = min(1.0, 0.6 + brightness * 0.4)
            
            particles.append({
                'x': round(x_pos + offset_x, 1),
                'y': round(y_pos + offset_y, 1),
                'char': char,
                'r': pr,
                'g': pg,
                'b': pb,
                'alpha': round(alpha, 2),
            })
            
            x_pos += col_gap
        y_pos += row_gap
    
    print(f"Generated {len(particles)} particles from {image_path}")
    
    # Write JS module
    with open(output_path, 'w') as f:
        f.write(f'// Auto-generated ASCII particle data from {image_path}\n')
        f.write(f'// {len(particles)} particles - true color scheme\n')
        f.write(f'const ASCII_PARTICLES = ')
        json.dump(particles, f, separators=(',', ':'))
        f.write(';\n')
    
    print(f"Written to {output_path}")

if __name__ == '__main__':
    extract_ascii('profile_square.jpg', 'ascii_data.js', canvas_size=400, font_size=6)
