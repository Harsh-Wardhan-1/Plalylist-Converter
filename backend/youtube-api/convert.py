from ytmusicapi import YTMusic
import os
import json

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'oauth.json')
# print(file_path)

file = os.path.join(script_dir, 'data.json')
f = open(file, encoding='utf-8')
obj = json.load(f)
# print(obj)


# obj = {
#     'name': 'Test',
#     'desc': 'MyPlaylist',
#     'tracks':[
#         {"name": "Hello"},
#         {"name": "Welcome"}
#     ]
# }

yt = YTMusic(file_path)

# playlistId = yt.create_playlist('test', 'test description')
# playlists = yt.get_user()
# print(playlists)

playlistId = yt.create_playlist(obj["playlistName"], "")
for item in obj["tracks"]:
    search_results = yt.search(item["name"], 'songs')
    print(search_results[0])
    yt.add_playlist_items(playlistId, [search_results[0]['videoId']])