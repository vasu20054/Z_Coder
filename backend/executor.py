import subprocess
import tempfile
import os
import uuid

def run_python_code(code: str, timeout: int = 5) -> dict:
    """
    Executes Python code safely with a timeout.

    Returns:
        dict with keys: success (bool), output (str), error (str)
    """
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
            return {
                "success": True,
                "output": result.stdout,
                "error": result.stderr
            }

        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "output": "",
                "error": "Execution timed out."
            }
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": f"Internal error: {str(e)}"
            }
