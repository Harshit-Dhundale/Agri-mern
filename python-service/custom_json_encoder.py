# custom_json_encoder.py

import json
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder that converts NumPy data types to Python standard types."""
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()  # Convert NumPy arrays to Python list
        else:
            return super(CustomJSONEncoder, self).default(obj)
