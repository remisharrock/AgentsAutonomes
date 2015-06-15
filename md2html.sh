touch /tmp/Architecture.html
echo "<html><header><meta charset="UTF-8"><body>" > /tmp/Architecture.html
markdown ./docs/Architecture.md >> /tmp/Architecture.html
echo "</body></html>" >> /tmp/Architecture.md
firefox /tmp/Architecture.html
