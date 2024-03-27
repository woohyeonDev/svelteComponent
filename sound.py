# 필요한 모듈 임포트
import os
from playsound import playsound
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class WatchdogHandler(FileSystemEventHandler):
    def __init__(self,soundDir):
        print("init")
        self.soundDir = soundDir

    def on_created(self, event):
        try:
            soundFilePath = os.path.join(self.soundDir, f"Alarm_kfc.wav")
            playsound(soundFilePath)
            with open(event.src_path, 'r', encoding='utf-8') as file:
                text = file.read().strip()
                numbers = list(text)
                length = len(numbers)
                for i, number in enumerate(numbers):
                    intValue = int(number)
                    if intValue != 0:
                        result = intValue * (10 ** (length - i - 1))
                        soundFilePath = os.path.join(self.soundDir, f"sound_{result}.wav")
                        playsound(soundFilePath)
                soundFilePath = os.path.join(self.soundDir, f"sound_hook1.wav")
                playsound(soundFilePath)
            os.remove(event.src_path)
        except Exception as e:
            print(f"Error handling file: {e}")

if __name__ == '__main__':
    watchedFolder = r"C:\didQue"
    soundDir = r"C:\sounds"
    event_handler = WatchdogHandler(soundDir)
    observer = Observer()
    observer.schedule(event_handler, watchedFolder, recursive=False)
    observer.start()
    try:        
        input("Press enter to stop monitoring...\n")
    except KeyboardInterrupt:
        observer.stop()
    observer.join()