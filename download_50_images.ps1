$destDir = "public/images/gallery"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir
}

$keywords = @("luxury wedding", "banquet hall", "corporate gala", "fine dining", "event decor", "palace interior", "reception", "party hall")

for ($i = 1; $i -le 50; $i++) {
    $keyword = $keywords[$i % $keywords.Count]
    # Using the Unsplash Source redirect for a random image with the keyword
    # Note: source.unsplash.com is being phased out but still works as a simple random redirector
    $url = "https://source.unsplash.com/featured/1200x800/?$($keyword.Replace(' ', ','))"
    
    $filename = "gallery-$i.jpg"
    $filepath = Join-Path $destDir $filename
    
    Write-Host "Downloading image $i of 50 for '$keyword'..."
    try {
        # Use -MaximumRedirection 5 to follow initial redirects
        Invoke-WebRequest -Uri $url -OutFile $filepath -MaximumRedirection 5
    } catch {
        Write-Host "Failed to download $filename. Retrying with a generic keyword..."
        $url = "https://source.unsplash.com/featured/1200x800/?banquet,luxury"
        Invoke-WebRequest -Uri $url -OutFile $filepath -MaximumRedirection 5
    }
}
Write-Host "Done! 50 images downloaded to $destDir"
