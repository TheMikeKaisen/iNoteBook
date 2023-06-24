We installed two new packages 
    1.npm install bcryptjs
    2.npm install jsonwebtoken

Theory: 
    bcryptjs: 
    we don't usually store passwords in the database. Instead what we do is we store a hash that indicates the password.
    So that even if a hacker get the access to the database, he will not be able to log into the account because he wont have the password. 

    But what some hackers do is that they keep a rainbow table, which have various patterns of the knowing the password.
    So what the developer does is that they add some characters of their own so it generates a different hash which cannot be tracked by the hacker.

    jsonwebtoken:
    when the user sends their information to the database, there should be a way to identify if it the user himself. 
    A JSON Web Token (JWT) is a compact, URL-safe means of representing claims securely between two parties. It is commonly used for authentication and authorization purposes in web applications and APIs. JWTs consist of three parts: a header, a payload, and a signature.

    Header: The header typically consists of two parts: the token type (which is JWT) and the signing algorithm used to generate the signature. It is base64url encoded.

    Payload: The payload contains the claims or statements about an entity (e.g., user) and additional metadata. Claims can include information such as the user's ID, role, permissions, or any other relevant data. The payload is also base64url encoded.

    Signature: The signature is created by combining the encoded header, payload, and a secret key. The secret key is known only to the server that issued the token. The signature is used to verify the integrity of the token and ensure that it has not been tampered with.

    When a client sends a request to a server, it includes the JWT in the request headers or as a parameter. The server can then validate the token by verifying the signature using the secret key. If the signature is valid, the server can trust the information contained in the token and use it to authenticate and authorize the client.