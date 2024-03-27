# 모니터링할 폴더 경로
$watchedFolder = "C:\didQue"
# 무한 루프를 돌며 폴더 모니터링
Add-Type -AssemblyName System.Speech
$speechSynthesizer = New-Object -TypeName System.Speech.Synthesis.SpeechSynthesizer
$speechSynthesizer.SelectVoice("Microsoft Heami Desktop")
while ($true) {
    $files = Get-ChildItem $watchedFolder
    if ($files.Count -gt 0) {
        foreach ($file in $files) {
            $text = Get-Content $file.FullName -Encoding UTF8
            $speechSynthesizer.Speak($text)
            Remove-Item $file.FullName # 파일 삭제
        }
    }
    Start-Sleep -Seconds 3
}