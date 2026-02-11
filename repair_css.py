
import os

file_path = r'c:\Users\Naisha\Downloads\happy-tods\css\style.css'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find the last good consistent styling
split_marker = '.fade-in-up.visible {'
parts = content.split(split_marker)

if len(parts) > 1:
    # Keep the part before marker and the marker block itself
    # We need to find where the block ends.
    # Actually, simpler: prompt showed line 678 is '}' of that block.
    # Let's verify content around there.
    # The view showed:
    # 675: .fade-in-up.visible {
    # 676:     opacity: 1;
    # 677:     transform: translateY(0);
    # 678: }
    
    # We will truncate after this block.
    cutoff_index = content.find('transform: translateY(0);')
    if cutoff_index != -1:
        # Find the next closing brace
        end_brace = content.find('}', cutoff_index)
        if end_brace != -1:
            clean_content = content[:end_brace+1]
            
            new_css = """

@keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Refinements */
.welcome-title .highlight-text {
    transition: transform 0.3s ease;
    cursor: default;
}
.welcome-title .highlight-text:hover {
    transform: rotate(0deg) scale(1.1);
}

.nav-links a { position: relative; }
.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-brand);
    transition: width 0.3s ease;
}
.nav-links a:hover::after { width: 100%; }
"""
            final_content = clean_content + new_css
            
            with open(file_path, 'w', encoding='utf-8') as f_out:
                f_out.write(final_content)
            print("Successfully repaired style.css")
        else:
            print("Could not find closing brace")
    else:
        print("Could not find marker")
else:
    print("Marker not found")
