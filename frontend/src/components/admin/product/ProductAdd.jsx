import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase.js";
import { useNavigate} from "react-router-dom"

const ProductAdd = () => {
  const [files, setFiles] = useState([]);
  const [uploadImageError, setUploadImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    category: "diet",
    description: "",
    quantity: 0,
    regularPrice: 0,
    discountPrice: 0,
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    if (
      e.target.type == "number" ||
      e.target.type == "text" ||
      e.target.type == "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 6) {
      setUploading(true);
      setUploadImageError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploadImageError(false);
          setUploading(false);
        })
        .catch((err) => {
          setUploadImageError("Image upload failed!");
          setUploading(false);
        });
    } else {
      setUploadImageError("You can only upload 5 image per product");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (formData.imageUrls.length < 1) return setError("You must upload at least 1 image!")
      if (+formData.regularPrice < +formData.discountPrice) return setError("Discount price must be lower than regular price")
      setLoading(true)
      setError(false)
      const res = await fetch("/api/product/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      if (data.success == false) {
        setError(data.message)
      }
      console.log("test");
      navigate(`/home`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="flex gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 mt-5 w-full"
      >
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              className="p-3 rounded-lg border"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="diet">Food & Beverages</option>
              <option value="sport">Sport</option>
              <option value="electronic">Electronic</option>
              <option value="cloth">Clothing</option>
              <option value="medicine">Medicine</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Discount Price:</label>
            <input
              type="number"
              placeholder="discount price"
              className="border p-3 rounded-lg"
              id="discountPrice"
              min="0"
              required
              onChange={handleChange}
              value={formData.discountPrice}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="regularPrice">Regular Price:</label>
            <input
              type="number"
              placeholder="regular price"
              className="border p-3 rounded-lg"
              id="regularPrice"
              min="0"
              required
              onChange={handleChange}
              value={formData.regularPrice}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              placeholder="quantity"
              className="border p-3 rounded-lg"
              id="quantity"
              min="0"
              max="1000"
              required
              onChange={handleChange}
              value={formData.quantity}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description:</label>
            <textarea
              className="border p-3 rounded-lg"
              type="text"
              placeholder="description"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border boder-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              disabled={loading}
              onClick={handleImageSubmit}
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {uploadImageError && uploadImageError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 mt-4 bg-[#FF9376] hover:bg-[#e67353] text-white rounded-lg uppercase hover:placeholder-opacity-95 disabled:opacity-80"
          >
            {loading ? "Adding..." : "Add new product"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
