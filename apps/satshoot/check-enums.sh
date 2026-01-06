#!/bin/bash

for file in $(find src -name "*.svelte" -exec grep -l "^\s*enum " {} \;); do
  echo "=== Checking $file ==="
  
  # Get all lines with enum
  grep -n "^\s*enum " "$file" | while read line; do
    line_num=$(echo "$line" | cut -d: -f1)
    enum_line=$(echo "$line" | cut -d: -f2-)
    
    # Count script tags before this line
    script_tags_before=$(head -n "$line_num" "$file" | grep -c "<script")
    script_tags_closed_before=$(head -n "$line_num" "$file" | grep -c "</script>")
    
    if [ "$script_tags_before" -le "$script_tags_closed_before" ]; then
      echo "❌ Line $line_num: Enum outside script tags"
      echo "   $enum_line"
    else
      echo "✓ Line $line_num: Enum inside script tags"
    fi
  done
  echo ""
done
