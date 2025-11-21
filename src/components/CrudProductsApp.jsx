import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

// URL base del servidor
const API_URL = `${import.meta.env.VITE_URL_SERVER}`;

const CrudProducstApp = () => {
  // Referencia al input de archivo para poder resetearlo
  const fileInputRef = useRef(null);
  
  // Estados del componente
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    enabled: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener todos los productos
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'price' ? parseFloat(value) || 0 : value)
    }));
  };

  // Manejar selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  // Cerrar modal y limpiar formulario
  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', category: '', price: 0, enabled: false });
    setImageFile(null);
    setImagePreview(null);
    // Resetear el input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Abrir modal para crear nuevo producto
  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', category: '', price: 0, enabled: false });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(true);
  };

  // Abrir modal para editar producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price || 0,
      enabled: product.enabled || false
    });
    setImageFile(null);
    // Mostrar la imagen actual del producto si existe
    setImagePreview(product.image ? `${API_URL}/public/${product.image}` : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(true);
  };

  // Guardar producto (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que al crear un producto nuevo tenga imagen
    if (!editingProduct && !imageFile) {
      alert('Por favor selecciona una imagen para el producto');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      // Agregar campos en el orden correcto
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('enabled', formData.enabled ? 'true' : 'false');
      
      // IMPORTANTE: Agregar la imagen al final y con el nombre exacto "image"
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (editingProduct) {
        // Editar producto existente
        // CRÍTICO: NO establecer Content-Type - axios lo hace automáticamente
        await axios.put(`${API_URL}/products/${editingProduct._id}`, formDataToSend);
        alert('Producto editado con éxito');
      } else {
        // Crear nuevo producto
        // CRÍTICO: NO establecer Content-Type - axios lo hace automáticamente
        await axios.post(`${API_URL}/products`, formDataToSend);
        alert('Producto creado con éxito');
      }

      closeModal();
      fetchProducts();
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Response data:', error.response?.data);
      
      // Manejar diferentes tipos de respuestas de error
      let errorMessage = 'Error desconocido';
      
      if (error.response) {
        // Si la respuesta es HTML (error 500 del servidor)
        if (typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE')) {
          errorMessage = 'Error del servidor: El archivo no se pudo procesar correctamente. Verifica que la imagen sea válida (JPG o PNG).';
        } 
        // Si la respuesta es JSON
        else if (error.response.data?.msg) {
          errorMessage = error.response.data.msg;
        } 
        else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
        else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`Error al guardar el producto: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/products/${id}`);
      alert('Producto eliminado con éxito');
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      const errorMessage = error.response?.data?.msg || 
                          error.response?.data?.message || 
                          error.message || 
                          'Error desconocido';
      alert(`Error al eliminar el producto: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado del producto (habilitar/deshabilitar)
  const handleToggleState = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/products/changeState/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      const errorMessage = error.response?.data?.msg || 
                          error.response?.data?.message || 
                          error.message || 
                          'Error desconocido';
      alert(`Error al cambiar el estado del producto: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Obtener URL de la imagen
  const getImageUrl = (imageName) => {
    if (!imageName) return null;
    return `${API_URL}/public/${imageName}`;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Producto
        </button>
      </div>

      {loading && products.length === 0 ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.image ? (
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <span className="text-muted">Sin imagen</span>
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className={`badge ${product.enabled ? 'bg-success' : 'bg-secondary'}`}>
                      {product.enabled ? 'Habilitado' : 'Deshabilitado'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(product)}
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button
                        className={`btn btn-sm ${product.enabled ? 'btn-outline-warning' : 'btn-outline-success'}`}
                        onClick={() => handleToggleState(product._id)}
                        disabled={loading}
                      >
                        {product.enabled ? 'Deshabilitar' : 'Habilitar'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(product._id)}
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={showModal ? { display: 'block' } : { display: 'none' }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="form-control"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageChange}
                    required={!editingProduct}
                  />
                  <small className="form-text text-muted">
                    Solo se permiten archivos JPG y PNG
                  </small>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail mt-2 image-preview"
                    />
                  )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="enabled"
                    checked={formData.enabled}
                    onChange={handleInputChange}
                    id="enabledCheck"
                  />
                  <label className="form-check-label" htmlFor="enabledCheck">
                    Habilitado
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CrudProducstApp;