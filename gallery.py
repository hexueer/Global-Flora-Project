from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive

gauth = GoogleAuth()
gauth.LocalWebserverAuth()

drive = GoogleDrive(gauth)

# Create httplib.Http() object.
http = drive.auth.Get_Http_Object()

# Create file object to upload.
file_obj = drive.CreateFile()
file_obj['title'] = "file name"

# Upload the file and pass the http object into the call to Upload.
file_obj.Upload(param={"http": http})