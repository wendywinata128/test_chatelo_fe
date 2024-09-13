#   Chatelo

-   Group Chat Room.
-   Waktu pertama kali masuk, user akan langsung di assign ke chat room welcome party.
-   User bisa buat chat room sendiri
-   User bisa join chat room
-   User bisa ngirim message, dll.


##   Model
-   ChatRoom -> ID, Code (String), Room Name (String), Room Password (String & bcrypt), Room Avatar (String), DateCreated, Author.
-   Message -> ID, Message, Author, ChatRoomID, DateCreated.
-   User -> ID, Name, Avatar, Token.
