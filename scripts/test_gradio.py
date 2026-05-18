from gradio_client import Client, handle_file
import sys
client = Client("http://192.168.0.100:6381/")
try:
    result = client.predict(handle_file("d:/projects/spacely-demo/public/samples/classroom_3k.jpg"), api_name="/predict")
    print(result[2])
except Exception as e:
    print(f"Error: {e}")
