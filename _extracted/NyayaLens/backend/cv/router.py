from fastapi import APIRouter, File, UploadFile, HTTPException
import cv2, numpy as np, pytesseract
from PIL import Image
from io import BytesIO

router = APIRouter(prefix="/api/v1/ocr", tags=["ocr"])

@router.post("/extract")
async def extract_text(file: UploadFile = File(...)):
    """Receive an image file, run OCR, and return extracted text.
    Simple preprocessing (grayscale + binary threshold) is applied to improve accuracy.
    """
    try:
        contents = await file.read()
        # Load image via Pillow, ensure RGB
        image = Image.open(BytesIO(contents)).convert("RGB")
        # Convert to OpenCV BGR format
        cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        # Preprocess: gray then OTSU threshold
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        # Perform OCR (English default)
        text = pytesseract.image_to_string(thresh, lang="eng")
        return {"text": text}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
