import os
import json
from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore


def _get_credentials():
    """
    Load Firebase credentials from:
    1. ENV JSON (Railway - recommended)
    2. File path (local dev)
    """

    # 🔥 PRIORITY 1: JSON từ ENV
    firebase_json = os.getenv("FIREBASE_CREDENTIALS_JSON")

    if firebase_json:
        try:
            cred_dict = json.loads(firebase_json)
            return credentials.Certificate(cred_dict)
        except Exception as e:
            raise ValueError(f"Invalid FIREBASE_CREDENTIALS_JSON: {e}")

    # 🔥 PRIORITY 2: FILE PATH
    firebase_path = os.getenv("FIREBASE_CREDENTIALS_PATH")

    if firebase_path:
        path = Path(firebase_path)

        if not path.is_absolute():
            path = Path.cwd() / path

        if not path.exists():
            raise FileNotFoundError(f"Firebase credentials file not found: {path}")

        return credentials.Certificate(str(path))

    # ❌ Nếu không có gì
    raise ValueError("Missing Firebase credentials (JSON or PATH)")


# 🚀 Init Firebase (chỉ chạy 1 lần)
if not firebase_admin._apps:
    cred = _get_credentials()
    firebase_admin.initialize_app(cred)
    print("🔥 Firebase initialized successfully")


# 📦 Firestore client
db = firestore.client()