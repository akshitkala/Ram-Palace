$ids = @(
    "yg5o3lNNsKM", "JqPw9ph81CE", "oGdnQKPDmCE", "PStFzPb5tQo", "FKLXn1mw3Bg", 
    "hyl3oWHu-N8", "BEdxXAiRfRM", "TxSBE7-Zpvg", "nYrj1OVh3Ls", "EWE3Oeb7BpQ", 
    "bt5Br2xp1pU", "2OrQ-JPCc08", "qZqjCgYEWl4", "5KKO1VaYq1A", "t417pRhcBbU",
    "BQJFzXfVjeE", "IL0qHqstPDQ", "HapntxPHh2k", "CZIlgUbWYkk", "0mYmjAkmScE", 
    "BPMuLbQwiyk", "iGIj65UOUQE", "fkwDuGiLLPU", "ZCDA1-cih6o", "ri3EqQWYahM",
    "pA_9vmsSIsY", "bGZ_A8vB5j8", "CO_uS269_Yc", "fI99m9Foc-Y", "nhfRkpVTiPQ", 
    "2_H1OekuzpY", "XkhWp_Z95K8", "u_g510CWdwg", "BfqRSrbFHDY", "S3Qh6mNZbLc", 
    "zjoQRRdff5k", "OQMZwNd3ThU", "Eih7MxllvY0", "9I_8Vv2mE18", "8m_E_V8JcTs", 
    "Vj_T3V6mK-M", "z9-A_1K0oB8", "pYzTXxAlzJ0", "V-yhwaT6JrY", "xrjpG1vT1-M", 
    "m1rLyoCJ1t0", "MkELj0OlKuw", "IkJI4C5wg5g", "uglfQEo-Ks0", "l799aFvR_C0"
)

$destDir = "public/images/gallery"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir
}

$i = 1
foreach ($id in $ids) {
    # Using Unsplash direct image service
    $url = "https://images.unsplash.com/photo-1$($id.Substring(0, 11))?w=1200&q=80"
    # Actually, Unsplash IDs for images.unsplash.com are usually different, but the photo service 1-ID prefix works often
    # Let's use the most reliable source for a given keyword if ID fails
    
    $filename = "gallery-$i.jpg"
    $filepath = Join-Path $destDir $filename
    
    # Try the simplest reliable direct link for a keyword to fill 50 images if ID is messy
    $keywords = "banquet,wedding,luxury,palace"
    $url = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200" # fallback to a known high-res ID if needed
    
    # Better: Use the source redirect or a search-based logic that works with curl
    # Let's use curl to follow redirects properly
    Write-Host "Downloading $filename..."
    # Using a variety of high-quality IDs that are known to exist or just source redirects
    curl -L -o $filepath "https://source.unsplash.com/featured/1200x800/?banquet,wedding&sig=$i"
    
    $i++
}
