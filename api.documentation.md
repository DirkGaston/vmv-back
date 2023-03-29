**#Login**
----
**POST /login**
----
  Loguea al usuario en la plataforma.
  * **URL Params**
    N/A
  * **Data Params**  
    ```
  {
    email: string,
    password: string
  }
    ```
  * **Headers**  
    Content-Type: application/json  
  * **Success Response:**  
  * **Code:** 200  
    **Content:**  
  ``` 
  { 
    token: string
    user_object
  }
  ```
  * **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`
  OR
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Users**
----
* User object
```
{
  id: integer
  email: string
  password: string
  name: string
  birthday: date
  emergency_contact_name: string
  emergency_contact_phone: string
  facebook_link: string
  instagram_link: string
  tiktok_link: string
  photo_url: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**GET /users**
----
  Devuelve todos los usuarios registrados.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  users: [
           {<user_object>},
           {<user_object>},
           {<user_object>}
         ]
}
```

**GET /users/:id**
----
  Devuelve un usuario específico.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <user_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**GET /users/:id/lessons**
----
  Devuelve todas las clases que ha agendado un usuario específico.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  lessons: [
           {<lesson_object>},
           {<lesson_object>},
           {<lesson_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**GET /users/:id/songs**
----
  Devuelve todas las canciones que ha registrado un usuario específico en la plataforma.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  songs: [
           {<song_object>},
           {<song_object>},
           {<song_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**GET /users/:id/exercises**
----
  Devuelve todos los ejercicios que ha realizado un usuario específico y ha subido a la plataforma.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  exercises: [
           {<exercise_object>},
           {<exercise_object>},
           {<exercise_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /users**
----
  Crea un usuario nuevo y devuelve el objeto.
* **URL Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    email: string,
    password: string
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <user_object> }` 

**PATCH /users/:id**
----
  Modifica campos en el usuario especificado y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
  	email?: string
    password?: string
    name?: string
    birthday?: date
    emergency_contact_phone?: string
    emergency_contact_name?: string
    facebook_link?: string
    instagram_link?: string
    tiktok_link?: string
    photo_url?: string
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <user_object> }`  
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**DELETE /users/:id**
----
  Elimina el usuario especificado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
  * **Code:** 204 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Usuario no existe" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Lessons**

* Lesson object
```
{
  id: integer
  user_id: <user_id>
  start_time: datetime(iso 8601)
  end_time: datetime(iso 8601)
  paid: boolean
  payment_id: <payment_id>
  proof_payment_url: string
  booked_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**GET /lessons**
----
  Devuelve todas las clases que se han reservado.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{
  lessons: [
           {<lesson_object>},
           {<lesson_object>},
           {<lesson_object>}
         ]
}
``` 

**GET /lessons/:id**
----
  Devuelve una clase agendada en específico.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <lesson_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Esta clase no existe." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /lessons**
----
  Crea una nueva clase agendada.
* **URL Params**  
  N/A
* **Data Params**  
```
  {
    user_id: integer
    start_time: datetime(iso 8601)
    end_time: datetime(iso 8601)
    paid: false
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }` 

**PATCH /lessons/:id**
----
  Actualiza campos de la clase especificada y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
    start_time?: datetime(iso 8601)
    end_time?: datetime(iso 8601)
    paid?: boolean
    payment_id?: integer
    proof_payment_url?: string
    package_id?: integer
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <lesson_object> }`  
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Esta clase no existe." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**DELETE /lessons/:id**
----
  Elimina la clase especificada.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
  * **Code:** 204
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Esta clase no existe." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Songs**
----

* Song object
```
{
  id: integer
  user_id: <user_id>
  title: string
  artist: string
  is_practicing: boolean
  recording_url: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**GET /songs**
----
 Devuelve todas las canciones registradas en la plataforma.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{
  songs: [
           {<song_object>},
           {<song_object>},
           {<song_object>}
         ]
}
``` 

**GET /songs/:id**
----
  Devuelve una canción específica.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <song_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe esa canción." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /songs**
----
  Crea una nueva canción.
* **URL Params**  
  N/A
* **Data Params**  
```
  {
    user_id: <user_id>
    title: string
    artist: string
    is_practicing: boolean
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <song_object> }` 

**PATCH /songs/:id**
----
  Actualiza campos en la canción especificada y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
    title?: string
    artist?: string
    is_practicing?: boolean
    recording_url?: string
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <song_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe esa canción." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**DELETE /songs/:id**
----
  Elimina la canción especificada.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
  * **Code:** 204 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe esa canción." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Recordings**
----

* Recording object
```
{
  id: integer
  user_id: <user_id>
  exercise_id: <exercise_id>
  recording_url: string
  uploaded_at: datetime(iso 8601)
}
```
**GET /recordings**
----
 Devuelve todas las grabaciones de ejercicios registradas en la plataforma.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{
  recordings: [
           {<recording_object>},
           {<recording_object>},
           {<recording_object>}
         ]
}
``` 

**GET /recordings/:id**
----
  Devuelve una grabación específica.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <recording_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe esa grabación." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /recordings**
----
  Crea una nueva grabación.
* **URL Params**  
  N/A
* **Data Params**  
```
  {
    user_id: <user_id>
    exercise_id: <exercise_id>
    recording_url: string
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <recording_object> }` 

**PATCH /recordings/:id**
----
  Actualiza campos en la grabación especificada y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
    recording_url: string
    uploaded_at: datetime(iso 8601)
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <recording_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe esa canción." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**DELETE /recordings/:id**
----
  Elimina la grabación especificada.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
  * **Code:** 204 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe esa grabación." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Exercises**
----

* Exercise object
```
{
  id: integer
  title: string
  description: string
  video_url: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**GET /exercises**
----
 Devuelve todos los ejercicios registrados en la plataforma.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{
  exercises: [
           {<exercise_object>},
           {<exercise_object>},
           {<exercise_object>}
         ]
}
``` 

**GET /exercises/:id**
----
  Devuelve un ejercicio específico.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <exercise_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese ejercicio." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /exercises**
----
  Crea un nuevo ejercicio.
* **URL Params**  
  N/A
* **Data Params**  
```
  {
  	title: string
    description: string
    video_url: string
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <song_object> }` 

**PATCH /exercises/:id**
----
  Actualiza campos en el ejercicio especificado y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
    title?: string
    description?: string
    video_url?: string
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <exercise_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese ejercicio." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**DELETE /exercises/:id**
----
  Elimina el ejercicio especificado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
  * **Code:** 204 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese ejercicio." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Packages**
----

* Packages object
```
{
  id: integer
  user_id: <user_id>
  paid: boolean
  payment_id: <payment_id>
  total_lessons: integer
  lessons_left: integer
  expiration_date: date
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**GET /packages**
----
 Devuelve todos los paquetes de clases registrados en la plataforma.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{
  packages: [
           {<package_object>},
           {<package_object>},
           {<package_object>}
         ]
}
``` 

**GET /packages/:id**
----
  Devuelve un paquete de clases específico.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <package_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese paquete de clases." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /packages**
----
  Crea un nuevo paquete de clases.
* **URL Params**  
  N/A
* **Data Params**  
```
  {
  	user_id: <user_id>
    paid: false
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <song_object> }` 

**PATCH /packages/:id**
----
  Actualiza campos en el paquete de clases especificado y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
    paid?: boolean
    payment_id?: <payment_id>
    total_lessons?: integer
    lessons_left?: integer
    expiration_date?: date
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <exercise_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese ejercicio." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**#Comments**
----

* Comment object
```
{
    user_id: <user_id>
    exercise_id: <exercise_id>
    comment: string
    created_at: datetime(iso 8601)
    updated_at: datetime(iso 8601)
}
```
**GET /comments**
----
 Devuelve todos los comentarios registrados en la plataforma.
* **URL Params**  
  N/A
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{comments: [
           {<comment_object>},
           {<comment_object>},
           {<comment_object>}
         ]
}
``` 

**GET /comments/:id**
----
  Devuelve un comentario específico.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <comment_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese comentario." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**POST /comments**
----
  Crea un nuevo comentario.
* **URL Params**  
  N/A
* **Data Params**  
```
  {
  	user_id: <user_id>
    exercise_id: <exercise_id>
    comment: string
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <comment_object> }` 

**PATCH /comments/:id**
----
  Actualiza campos en el comentario especificado y devuelve el objeto actualizado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
    comment: string
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <comment_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese comentario." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`

**DELETE /comments/:id**
----
  Elimina el comentario especificado.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  N/A
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
  * **Code:** 204 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "No existe ese ejercicio." }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "No estás autorizado para realizar esta petición." }`






