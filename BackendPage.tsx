import React, { useState, useCallback } from 'react';
import { Product, NewsArticle, PodcastEpisode, BlogPost, CalendarEvent, ContactInfo, DonationOption, SubscriptionTier, DonationPageContent, ThankYouContent, AboutUsPageContent, VisionPageContent, YouthConnectPageContent, DiasporaPageContent, YorubaHero, AnalyticsData, TraditionalQAItem, Testimonial, HomePageContent, HeaderContent, NowPlaying } from '../types';

// Generic CRUD form component to reduce repetition
const CrudForm = <T extends { id: number }>({ item, onSave, onCancel, fields }: { item: Partial<T> | null, onSave: (item: T) => void, onCancel: () => void, fields: (keyof T)[] }) => {
    const [formData, setFormData] = useState(item || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        let finalValue: any;
        if (type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            finalValue = value === '' ? '' : parseFloat(value);
        } else if (name === 'isPopular' && type === 'select-one') {
            finalValue = value === 'true';
        } else {
            finalValue = value;
        }
        
        setFormData({ ...formData, [name]: finalValue });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as T);
    };

    const getInputType = (field: keyof T) => {
        const fieldStr = String(field).toLowerCase();
        if (fieldStr.includes('price') || fieldStr.includes('amount')) return 'number';
        if (fieldStr.includes('date')) return 'date';
        if (fieldStr.includes('description') || fieldStr.includes('excerpt') || fieldStr.includes('features') || fieldStr.includes('answer') || fieldStr.includes('quote') || fieldStr.includes('bio')) return 'textarea';
        if (fieldStr.includes('ispopular')) return 'select-boolean';
        return 'text';
    };

    const getLabel = (field: keyof T) => {
        const fieldStr = String(field);
        return fieldStr.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    const formId = `form-${(item as any)?.id || 'new'}`;

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
            {fields.filter(f => f !== 'id').map(field => {
                const fieldId = `${formId}-${String(field)}`;
                const inputType = getInputType(field);
                return (
                    <div key={String(field)}>
                        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">{getLabel(field)}</label>
                        {(() => {
                            if (inputType === 'textarea') {
                                return <textarea id={fieldId} name={String(field)} value={(formData as any)[field] || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />;
                            }
                            if (inputType === 'select-boolean') {
                                return (
                                    <select id={fieldId} name={String(field)} value={(formData as any)[field] ? 'true' : 'false'} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" required>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                );
                            }
                            return <input id={fieldId} type={inputType} name={String(field)} value={(formData as any)[field] || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" required step={inputType === 'number' ? '0.01' : undefined}/>;
                        })()}
                    </div>
                );
            })}
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
            </div>
        </form>
    );
};


// Generic management section component
const ManagementSection = <T extends { id: number, title?: string, name?: string, amount?: number, question?: string, quote?: string }>({ title, items, setItems, fields, renderItem }: { title: string, items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>, fields: (keyof T)[], renderItem?: (item: T) => React.ReactNode }) => {
    const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSave = (item: T) => {
        if ('id' in item && item.id) {
            setItems(prev => prev.map(i => i.id === item.id ? item : i));
        } else {
            const newItem = { ...item, id: Date.now() };
            setItems(prev => [...prev, newItem]);
        }
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(prev => prev.filter(i => i.id !== id));
        }
    };
    
    const handleAddNew = () => {
      const newItemTemplate: Partial<T> = {};
      fields.forEach(field => {
        (newItemTemplate as any)[field] = '';
      });
      delete (newItemTemplate as any).id;
      setEditingItem(newItemTemplate);
      setIsCreating(true);
    };

    const sectionTitleId = `section-title-${title.replace(/\s+/g, '-').toLowerCase()}`;
    
    const getItemName = (item: T) => item.quote || item.question || item.title || item.name || (item.amount ? `$${item.amount}` : `Item ${item.id}`);

    return (
        <section aria-labelledby={sectionTitleId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 id={sectionTitleId} className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
                <button onClick={handleAddNew} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold">Add New</button>
            </div>

            {(isCreating || editingItem) && (
                <CrudForm<T>
                    item={editingItem}
                    onSave={handleSave}
                    onCancel={() => { setEditingItem(null); setIsCreating(false); }}
                    fields={fields}
                />
            )}

            <ul className="space-y-3 mt-4" role="list">
                {items.map(item => {
                    const itemName = getItemName(item);
                    return (
                        <li key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div className="flex-grow pr-4">
                                {renderItem ? renderItem(item) : (
                                    <span className="truncate dark:text-gray-200">{itemName}</span>
                                )}
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                                <button
                                    onClick={() => setEditingItem(item)}
                                    className="text-sm text-blue-600 dark:text-yellow-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                                    aria-label={`Edit ${itemName}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-sm text-red-600 dark:text-red-400 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                                    aria-label={`Delete ${itemName}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    )
                })}
                 {items.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-4">No items yet.</p>}
            </ul>
        </section>
    );
};

const GeneralSettings = ({ logoUrl, setLogoUrl }: { logoUrl: string | null; setLogoUrl: (url: string) => void; }) => {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const inputId = "logo-upload-input";

    return (
        <section aria-labelledby="general-settings-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
             <h3 id="general-settings-title" className="text-xl font-bold mb-4 text-gray-800 dark:text-white">General Settings</h3>
             <div className="space-y-2">
                 <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">Upload Station Logo</label>
                 <input id={inputId} type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-yellow-300 dark:hover:file:bg-gray-500"/>
                {logoUrl && <img src={logoUrl} alt="Logo preview" className="mt-2 h-20 w-auto" />}
             </div>
        </section>
    )
};

const NowPlayingSettings: React.FC<{ content: NowPlaying, setContent: (content: NowPlaying) => void }> = ({ content, setContent }) => {
    const [formData, setFormData] = useState(content);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setContent(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };
    
    return (
        <section aria-labelledby="now-playing-settings-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 id="now-playing-settings-title" className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Now Playing Information</h3>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label htmlFor="songTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Song Title</label>
                    <input type="text" id="songTitle" name="songTitle" value={formData.songTitle} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                </div>
                <div>
                    <label htmlFor="artistName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Artist Name</label>
                    <input type="text" id="artistName" name="artistName" value={formData.artistName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                </div>
                 <div className="flex justify-end items-center space-x-4">
                    {isSaved && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update Now Playing</button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">Clear fields and save to hide the display on the Home page.</p>
            </form>
        </section>
    );
};

const DonationPageSettings = ({ content, setContent }: { content: DonationPageContent; setContent: (content: DonationPageContent) => void; }) => {
    const [formData, setFormData] = useState(content);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setContent(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <section aria-labelledby="donation-page-settings-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 id="donation-page-settings-title" className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Donation Page Settings</h3>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label htmlFor="donationTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                    <input type="text" id="donationTitle" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="donationDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                    <textarea id="donationDescription" name="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                 <div>
                    <label htmlFor="donationImage" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Upload Image</label>
                    <input id="donationImage" type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-yellow-300 dark:hover:file:bg-gray-500"/>
                    {formData.imageUrl && <img src={formData.imageUrl} alt="Donation page preview" className="mt-2 h-20 w-auto object-cover rounded" />}
                </div>
                <div className="flex justify-end items-center space-x-4">
                    {isSaved && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Donation Page</button>
                </div>
            </form>
        </section>
    );
}

const ThankYouSettings = ({ content, setContent }: { content: ThankYouContent; setContent: (content: ThankYouContent) => void; }) => {
    const [formData, setFormData] = useState(content);
    const [isSaved, setIsSaved] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setContent(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };
    
    return (
        <section aria-labelledby="thank-you-settings-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 id="thank-you-settings-title" className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Thank You Page Settings</h3>
            <form onSubmit={handleSave} className="space-y-4">
                 <div>
                    <label htmlFor="thankYouTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                    <input type="text" id="thankYouTitle" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="thankYouMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                    <textarea id="thankYouMessage" name="message" value={formData.message} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                <div className="flex justify-end items-center space-x-4">
                    {isSaved && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Thank You Page</button>
                </div>
            </form>
        </section>
    );
};

const ContactSettings = ({ contactInfo, setContactInfo }: { contactInfo: ContactInfo; setContactInfo: (info: ContactInfo) => void; }) => {
    const [formData, setFormData] = useState(contactInfo);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setContactInfo(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000); // Hide message after 2 seconds
    };

    return (
        <section aria-labelledby="contact-settings-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 id="contact-settings-title" className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Contact Page Settings</h3>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                </div>
                <div className="flex justify-end items-center space-x-4">
                    {isSaved && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Contact Info</button>
                </div>
            </form>
        </section>
    );
}

const ContentPageSettings = ({ sectionTitle, content, setContent, fields }: { sectionTitle: string; content: any; setContent: (content: any) => void; fields: string[] }) => {
    const [formData, setFormData] = useState(content);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setContent(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const getLabel = (field: string) => field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    const sectionId = sectionTitle.replace(/\s+/g, '-').toLowerCase();

    return (
        <section aria-labelledby={`${sectionId}-title`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 id={`${sectionId}-title`} className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{sectionTitle}</h3>
            <form onSubmit={handleSave} className="space-y-4">
                {fields.map(field => {
                    const fieldId = `${sectionId}-${field}`;
                    if (field === 'imageUrl') {
                        return (
                            <div key={field}>
                                <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">Image</label>
                                <input id={fieldId} type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-yellow-300 dark:hover:file:bg-gray-500"/>
                                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="mt-2 h-20 w-auto object-cover rounded" />}
                            </div>
                        );
                    }
                    if (field === 'description' || field === 'quote' || field === 'bio' || field.toLowerCase().includes('content')) {
                        return (
                            <div key={field}>
                                <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{getLabel(field)}</label>
                                <textarea id={fieldId} name={field} value={formData[field]} onChange={handleChange} rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                            </div>
                        );
                    }
                    return (
                        <div key={field}>
                            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{getLabel(field)}</label>
                            <input type="text" id={fieldId} name={field} value={formData[field]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
                        </div>
                    );
                })}
                <div className="flex justify-end items-center space-x-4">
                    {isSaved && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </section>
    );
};

const AnalyticsSettings: React.FC<{ data: AnalyticsData, setData: (data: AnalyticsData) => void }> = ({ data, setData }) => {
    const [formData, setFormData] = useState(data);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setData(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <section aria-labelledby="analytics-settings-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 id="analytics-settings-title" className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Analytics Data</h3>
            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="totalListeners24h" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Total Listeners (24h)</label>
                        <input type="text" id="totalListeners24h" name="totalListeners24h" value={formData.totalListeners24h} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                     <div>
                        <label htmlFor="listenersChange" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Listeners Change (%)</label>
                        <input type="text" id="listenersChange" name="listenersChange" value={formData.listenersChange} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                     <div>
                        <label htmlFor="storeSalesMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Store Sales (Month)</label>
                        <input type="text" id="storeSalesMonth" name="storeSalesMonth" value={formData.storeSalesMonth} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                     <div>
                        <label htmlFor="salesChange" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sales Change (%)</label>
                        <input type="text" id="salesChange" name="salesChange" value={formData.salesChange} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                </div>
                <div>
                    <label htmlFor="listenerTrends" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Listener Trends</label>
                    <input type="text" id="listenerTrends" name="listenerTrends" value={formData.listenerTrends} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    <p className="text-xs text-gray-500 mt-1">Comma-separated numbers, e.g., 12500,13100,13800</p>
                </div>
                <div>
                    <label htmlFor="topLocations" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Top Locations</label>
                    <textarea id="topLocations" name="topLocations" value={formData.topLocations} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    <p className="text-xs text-gray-500 mt-1">Semicolon-separated pairs, e.g., Lagos:45;London:25</p>
                </div>
                 <div>
                    <label htmlFor="topProducts" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Top Products</label>
                    <textarea id="topProducts" name="topProducts" value={formData.topProducts} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    <p className="text-xs text-gray-500 mt-1">Semicolon-separated pairs, e.g., Radio:1950;T-Shirt:1230</p>
                </div>

                <div className="flex justify-end items-center space-x-4">
                    {isSaved && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Analytics Data</button>
                </div>
            </form>
        </section>
    );
};


interface BackendPageProps {
    logoUrl: string | null;
    setLogoUrl: (url: string) => void;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    news: NewsArticle[];
    setNews: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
    podcasts: PodcastEpisode[];
    setPodcasts: React.Dispatch<React.SetStateAction<PodcastEpisode[]>>;
    blogs: BlogPost[];
    setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
    events: CalendarEvent[];
    setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
    contactInfo: ContactInfo;
    setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
    donationOptions: DonationOption[];
    setDonationOptions: React.Dispatch<React.SetStateAction<DonationOption[]>>;
    subscriptionTiers: SubscriptionTier[];
    setSubscriptionTiers: React.Dispatch<React.SetStateAction<SubscriptionTier[]>>;
    donationPageContent: DonationPageContent;
    setDonationPageContent: React.Dispatch<React.SetStateAction<DonationPageContent>>;
    thankYouContent: ThankYouContent;
    setThankYouContent: React.Dispatch<React.SetStateAction<ThankYouContent>>;
    aboutUsPageContent: AboutUsPageContent;
    setAboutUsPageContent: React.Dispatch<React.SetStateAction<AboutUsPageContent>>;
    visionPageContent: VisionPageContent;
    setVisionPageContent: React.Dispatch<React.SetStateAction<VisionPageContent>>;
    youthConnectPageContent: YouthConnectPageContent;
    setYouthConnectPageContent: React.Dispatch<React.SetStateAction<YouthConnectPageContent>>;
    diasporaPageContent: DiasporaPageContent;
    setDiasporaPageContent: React.Dispatch<React.SetStateAction<DiasporaPageContent>>;
    yorubaHero: YorubaHero;
    setYorubaHero: React.Dispatch<React.SetStateAction<YorubaHero>>;
    analyticsData: AnalyticsData;
    setAnalyticsData: React.Dispatch<React.SetStateAction<AnalyticsData>>;
    traditionalQA: TraditionalQAItem[];
    setTraditionalQA: React.Dispatch<React.SetStateAction<TraditionalQAItem[]>>;
    testimonials: Testimonial[];
    setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
    homePageContent: HomePageContent;
    setHomePageContent: React.Dispatch<React.SetStateAction<HomePageContent>>;
    headerContent: HeaderContent;
    setHeaderContent: React.Dispatch<React.SetStateAction<HeaderContent>>;
    nowPlaying: NowPlaying;
    setNowPlaying: React.Dispatch<React.SetStateAction<NowPlaying>>;
}

const BackendPage: React.FC<BackendPageProps> = (props) => {
    return (
        <div className="p-4 space-y-6 bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Backend Management</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your application's content here.</p>
            </div>
            <GeneralSettings logoUrl={props.logoUrl} setLogoUrl={props.setLogoUrl} />
            <NowPlayingSettings content={props.nowPlaying} setContent={props.setNowPlaying} />
            <ContentPageSettings 
                sectionTitle="Header Content" 
                content={props.headerContent} 
                setContent={props.setHeaderContent} 
                fields={['title', 'subtitle', 'tagline']} 
            />
            <ContentPageSettings 
                sectionTitle="Home Page Content" 
                content={props.homePageContent} 
                setContent={props.setHomePageContent} 
                fields={[
                    'heroTitle', 
                    'heroSubtitle', 
                    'heroButtonText', 
                    'yorubaPeopleTitle',
                    'yorubaPeopleContent',
                    'yorubaPeopleButtonText',
                    'testimonialsTitle',
                    'exploreTitle',
                    'exploreCard1Title',
                    'exploreCard1Content',
                    'exploreCard1ButtonText',
                    'exploreCard2Title',
                    'exploreCard2Content',
                    'exploreCard2ButtonText'
                ]} 
            />
            <AnalyticsSettings data={props.analyticsData} setData={props.setAnalyticsData} />
            <ContentPageSettings sectionTitle="Ojulowo Omo Yoruba Pataki Section" content={props.yorubaHero} setContent={props.setYorubaHero} fields={['name', 'bio', 'imageUrl']} />
            <ContentPageSettings sectionTitle="About Us Page" content={props.aboutUsPageContent} setContent={props.setAboutUsPageContent} fields={['title', 'subtitle', 'description', 'imageUrl']} />
            <ContentPageSettings sectionTitle="Vision Page" content={props.visionPageContent} setContent={props.setVisionPageContent} fields={['title', 'subtitle', 'quote', 'description', 'imageUrl']} />
            <ContentPageSettings sectionTitle="Youth Connect Page" content={props.youthConnectPageContent} setContent={props.setYouthConnectPageContent} fields={['title', 'subtitle', 'description', 'imageUrl']} />
            <ContentPageSettings sectionTitle="Diaspora Network Page" content={props.diasporaPageContent} setContent={props.setDiasporaPageContent} fields={['title', 'subtitle', 'description', 'imageUrl']} />
            <DonationPageSettings content={props.donationPageContent} setContent={props.setDonationPageContent} />
            <ThankYouSettings content={props.thankYouContent} setContent={props.setThankYouContent} />
            <ContactSettings contactInfo={props.contactInfo} setContactInfo={props.setContactInfo} />
            <ManagementSection<TraditionalQAItem> title="Manage FAQ" items={props.traditionalQA} setItems={props.setTraditionalQA} fields={['question', 'answer']} />
            <ManagementSection<Testimonial> 
                title="Manage Testimonials" 
                items={props.testimonials} 
                setItems={props.setTestimonials} 
                fields={['quote', 'author']}
                renderItem={(item) => (
                    <div>
                        <blockquote className="text-gray-800 dark:text-gray-200 italic border-l-4 border-gray-300 dark:border-gray-500 pl-3">
                            "{item.quote}"
                        </blockquote>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-right mt-1">— {item.author}</p>
                    </div>
                )}
            />
            <ManagementSection<Product> title="Manage Products" items={props.products} setItems={props.setProducts} fields={['name', 'description', 'price', 'imageUrl']} />
            <ManagementSection<NewsArticle> title="Manage News" items={props.news} setItems={props.setNews} fields={['title', 'excerpt', 'author', 'date', 'imageUrl']} />
            <ManagementSection<PodcastEpisode> title="Manage Podcasts" items={props.podcasts} setItems={props.setPodcasts} fields={['title', 'duration', 'imageUrl']} />
            <ManagementSection<BlogPost> title="Manage Blog Posts" items={props.blogs} setItems={props.setBlogs} fields={['title', 'author', 'date', 'imageUrl']} />
            <ManagementSection<CalendarEvent> title="Manage Calendar Events" items={props.events} setItems={props.setEvents} fields={['title', 'date', 'time', 'description', 'category']} />
            <ManagementSection<DonationOption> title="Manage Donation Options" items={props.donationOptions} setItems={props.setDonationOptions} fields={['amount']} />
            <ManagementSection<SubscriptionTier> title="Manage Subscription Tiers" items={props.subscriptionTiers} setItems={props.setSubscriptionTiers} fields={['title', 'price', 'period', 'features', 'isPopular']} />
        </div>
    );
};

export default BackendPage;