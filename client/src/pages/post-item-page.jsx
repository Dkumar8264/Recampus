import { CheckCircle2, CircleDollarSign, HelpCircle, ImagePlus, PackageCheck, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { compressListingImage } from '../lib/image-compression.js';
import { api } from '../lib/api.js';

const postTypes = [
  { value: 'lost', label: 'Lost item', icon: HelpCircle, helper: 'Find help from nearby students' },
  { value: 'found', label: 'Found item', icon: PackageCheck, helper: 'Return it to the right person' },
  { value: 'sale', label: 'Sell item', icon: CircleDollarSign, helper: 'List a campus marketplace item' }
];

const categories = [
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'cycles', label: 'Cycles' },
  { value: 'stationery', label: 'Stationery' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'other', label: 'Other' }
];

const locations = [
  { value: 'library', label: 'Library' },
  { value: 'hostel-block-a', label: 'Hostel Block A' },
  { value: 'hostel-block-b', label: 'Hostel Block B' },
  { value: 'canteen', label: 'Canteen' },
  { value: 'main-block', label: 'Main Block' },
  { value: 'sports-ground', label: 'Sports Ground' },
  { value: 'other', label: 'Other' }
];

const initialValues = {
  type: 'lost',
  title: '',
  description: '',
  category: 'books',
  location: 'library',
  price: '',
  imageUrl: ''
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function PostItemPage() {
  const { type: routeType } = useParams();
  const navigate = useNavigate();
  const hasRouteType = postTypes.some((type) => type.value === routeType);
  const defaultType = hasRouteType ? routeType : 'lost';
  const [formValues, setFormValues] = useState({ ...initialValues, type: defaultType });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!hasRouteType) {
      return;
    }

    setFormValues((current) => ({
      ...current,
      type: routeType,
      price: routeType === 'sale' ? current.price : ''
    }));
  }, [hasRouteType, routeType]);

  const selectedTypeLabel = useMemo(
    () => postTypes.find((type) => type.value === formValues.type)?.label ?? 'Post item',
    [formValues.type]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleImageFile = async (file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Choose an image file.');
      return;
    }

    try {
      const compressedFile = await compressListingImage(file, {
        maxSizeMB: 0.35,
        maxWidthOrHeight: 1200
      });
      const imageDataUrl = await readFileAsDataUrl(compressedFile);
      setFormValues((current) => ({ ...current, imageUrl: imageDataUrl }));
      toast.success('Image added.');
    } catch {
      toast.error('Could not prepare image.');
    }
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    setIsDraggingImage(false);
    handleImageFile(event.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      type: formValues.type,
      title: formValues.title,
      description: formValues.description,
      category: formValues.category,
      location: formValues.location,
      images: formValues.imageUrl ? [formValues.imageUrl] : []
    };

    if (formValues.type === 'sale') {
      payload.price = Number(formValues.price);
    }

    try {
      await api.post('/listings', payload);
      toast.success('Item posted.');
      navigate('/browse');
    } catch (error) {
      const validationError = error.response?.data?.details?.[0];
      const fieldName = validationError?.path ? `${validationError.path}: ` : '';
      toast.error(
        validationError?.msg
          ? `${fieldName}${validationError.msg}`
          : error.response?.data?.message ?? 'Could not post item.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-6 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-campus">Create listing</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{selectedTypeLabel}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-700 sm:text-base">
          Share enough detail for students to identify the item and arrange a safe campus handoff.
        </p>
        {hasRouteType ? (
          <Link to="/post" className="mt-3 inline-flex text-sm font-semibold text-campus hover:text-[#135a72]">
            Change listing type
          </Link>
        ) : null}
      </div>

      <form className="grid gap-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
        {!hasRouteType ? (
          <fieldset>
            <legend className="text-sm font-semibold text-stone-800">Listing type</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {postTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formValues.type === type.value;

                return (
                  <label
                    key={type.value}
                    className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-md border p-3 text-sm transition ${
                      isSelected
                        ? 'border-campus bg-teal-50 text-campus ring-2 ring-campus/15'
                        : 'border-stone-300 text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={isSelected}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-campus shadow-sm">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold">{type.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-stone-600">{type.helper}</span>
                    </span>
                    {isSelected ? <CheckCircle2 size={18} className="ml-auto shrink-0" aria-hidden="true" /> : null}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        <div className="grid gap-4">
          <label className="block" htmlFor="title">
            <span className="text-sm font-medium text-stone-800">Title</span>
            <input
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={120}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              placeholder="Blue Casio calculator"
            />
          </label>

          <label className="block" htmlFor="description">
            <span className="text-sm font-medium text-stone-800">Description</span>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={1200}
              rows={5}
              className="mt-2 w-full resize-y rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              placeholder="Add color, brand, where it was lost/found, and any identifying details."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="category">
              <span className="text-sm font-medium text-stone-800">Category</span>
              <select
                id="category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                className="mt-2 min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block" htmlFor="location">
              <span className="text-sm font-medium text-stone-800">Campus location</span>
              <select
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                className="mt-2 min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              >
                {locations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {formValues.type === 'sale' ? (
            <label className="block" htmlFor="price">
              <span className="text-sm font-medium text-stone-800">Price</span>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={formValues.price}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
                placeholder="500"
              />
            </label>
          ) : null}

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <span className="text-sm font-medium text-stone-800">Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => handleImageFile(event.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDraggingImage(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setIsDraggingImage(false)}
              onDrop={handleImageDrop}
              className={`mt-2 flex min-h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-center transition ${
                isDraggingImage
                  ? 'border-campus bg-white ring-2 ring-campus/15'
                  : 'border-stone-300 bg-white hover:border-campus'
              }`}
            >
              {formValues.imageUrl ? (
                <span className="relative block w-full max-w-sm overflow-hidden rounded-md border border-stone-200 bg-white">
                  <img src={formValues.imageUrl} alt="" className="aspect-[4/3] w-full object-cover" />
                </span>
              ) : (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-campus shadow-sm">
                    <ImagePlus size={22} aria-hidden="true" />
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-ink">Drop an image here or tap to browse</span>
                  <span className="mt-1 block text-xs leading-5 text-stone-600">
                    JPEG, PNG, or WebP. The image is compressed before posting.
                  </span>
                </>
              )}
            </button>
            {formValues.imageUrl ? (
              <button
                type="button"
                onClick={() => {
                  setFormValues((current) => ({ ...current, imageUrl: '' }));
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="btn-secondary mt-2 min-h-10 px-3 py-2"
              >
                <X size={16} />
                Remove image
              </button>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-6 w-full py-3"
        >
          {isSubmitting ? 'Posting...' : 'Post item'}
        </button>
      </form>
    </section>
  );
}
