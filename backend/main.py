
from fastapi import Depends, FastAPI, HTTPException, status
import pymysql
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Database connection
db = pymysql.connect(
    host="mysql",
    user="root",
    password="root123",
    database="library_management",
    port=3306
)

# JWT configuration
SECRET_KEY = "83daa0256a2289b0fb23693bf1f6034d44396675749244721a2b20e896e11662"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: int | None = None


class User(BaseModel):
    id: int


class UserInDB(User):
    hashed_password: str


# Password hashing configuration
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# Hash password
def get_password_hash(password):
    return pwd_context.hash(password)


# Get user from database
def get_user(db, id: int):
    cursor = db.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.execute(
            "SELECT id, password AS hashed_password FROM users WHERE id = %s",
            (id,)
        )

        user_data = cursor.fetchone()

        if user_data:
            return UserInDB(**user_data)

        return None

    finally:
        cursor.close()


# Authenticate user
def authenticate_user(db, id: str, password: str):
    user = get_user(db, id)

    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False

    return user


# Create JWT access token
def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None
):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# Get current authenticated user
async def get_current_user(
    token: str = Depends(oauth_2_scheme)
):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not verify credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credential_exception

        token_data = TokenData(id=user_id)

    except JWTError:
        raise credential_exception

    user = get_user(db, token_data.id)

    if user is None:
        raise credential_exception

    return user


# Get current active user
async def get_current_active_user(
    current_user: User = Depends(get_current_user)
):
    return current_user


# Login endpoint
@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token_expires = timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


pwd = get_password_hash("sabab123")

print(pwd) 
@app.get("/names")
async def get_names(
    current_user: User = Depends(get_current_active_user)
):
    cursor = db.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.execute("SELECT * FROM Name")
        data = cursor.fetchall()

        return data

    finally:
        cursor.close()
