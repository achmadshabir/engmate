#!/usr/bin/env python3
"""
Generate a secure random secret key for JWT
Usage: python generate_secret.py
"""
import secrets
import string

def generate_secret_key(length=64):
    """Generate a secure random secret key"""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    secret_key = ''.join(secrets.choice(alphabet) for _ in range(length))
    return secret_key

if __name__ == "__main__":
    secret = generate_secret_key()
    print("\n" + "="*70)
    print("🔐 Generated JWT Secret Key:")
    print("="*70)
    print(f"\n{secret}\n")
    print("="*70)
    print("\n📋 Add this to Railway Environment Variables:")
    print(f"   JWT_SECRET_KEY={secret}")
    print("\n⚠️  Keep this secret! Do not commit to Git.")
    print("="*70 + "\n")
