from os import listdir
import eyed3
from PIL import Image

def rgb_to_hex(r, g, b):
  return '#{:02x}{:02x}{:02x}'.format(int(r), int(g), int(b))

root = "python"
text = "songs = ["
music = f"{root}/music/"
songs = listdir(music)
for sname in songs:
    song = eyed3.load(music+sname)
    tag = song.tag
    title = tag.title
    author = tag.artist
    length = str(int(song.info.time_secs))
    path=f"{root}/albums/{title}-{author}.jpg"
    with open(path,'wb+') as file:
        file.write(tag.images[0].image_data)

    original = Image.open(path).resize((100,100))
    width = original.size[0]
    height = original.size[1]
    avgcols = [0,0,0]
    for i in range(height):
        for j in range(width):
            color = original.getpixel((j,i))
            avgcols[0] += color[0]
            avgcols[1] += color[1]
            avgcols[2] += color[2]
    avgcols[0] /= width*height
    avgcols[1] /= width*height
    avgcols[2] /= width*height
    color = rgb_to_hex(avgcols[0],avgcols[1],avgcols[2])


    text += """\n   {
        name:"setname",
        author:"setauthor",
        file:"setfile",
        cover:"setcover",
        length:setlength,
        color:"setcolor"
    },""".replace("setname",title).replace("setauthor",author).replace("setfile",music+sname).replace("setcover",path).replace("setlength",length).replace("setcolor",color)
text += "\n]"
with open("songs.txt","w") as f:
    f.write(text)
# songs = [
#     {
#         name:"Я бью женщин и детей",
#         author:"Валентин Стрыкало",
#         file:"media/music/Я бью женщин и детей.mp3",
#         cover:"media/albums/Смирись и расслабься.png",
#         length:161,
#         color:"#9a996e"
#     },