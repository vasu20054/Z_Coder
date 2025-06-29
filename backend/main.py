from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import tempfile
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            code = await websocket.receive_text()
            result = run_python_code(code)
            await websocket.send_text(result)
    except WebSocketDisconnect:
        print("WebSocket disconnected")

def run_python_code(code: str, timeout: int = 5) -> str:
    with tempfile.TemporaryDirectory() as tmpdirname:
        file_name = f"{uuid.uuid4().hex}.py"
        file_path = os.path.join(tmpdirname, file_name)

        with open(file_path, "w") as f:
            f.write(code)

        try:
            result = subprocess.run(
                ["python3", file_path],
                capture_output=True,
                text=True,
                timeout=timeout
            )
            if result.stderr:
                return result.stderr
            return result.stdout
        except subprocess.TimeoutExpired:
            return "Execution timed out."
        except Exception as e:
            return f"Internal error: {str(e)}"
