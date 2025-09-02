import React, { useEffect, useState } from 'react';
import { add, update } from '../store/entriesStore';

const empty = {
	imageUrl: '',
	rating: 0,
	categories: [],
	date: new Date(),
	description: '',
};

export default function AddEditEntryModal({ open, initial, onClose }) {
	const [form, setForm] = useState(empty);
	const [categoriesInput, setCategoriesInput] = useState('');

	useEffect(() => {
		if (open) {
			if (initial) {
				setForm({
					...initial,
					date: new Date(initial.date),
				});
				setCategoriesInput((initial.categories || []).join(', '));
			} else {
				setForm(empty);
				setCategoriesInput('');
			}
		}
	}, [open, initial]);

	if (!open) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		const cats = categoriesInput
			.split(',')
			.map((c) => c.trim())
			.filter(Boolean);
		const payload = {
			...form,
			categories: cats,
		};
		if (initial?.id) {
			update(initial.id, payload);
		} else {
			add(payload);
		}
		onClose && onClose();
	};

	const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-sm p-4 space-y-4">
				<div className="text-lg font-semibold">{initial ? 'Edit entry' : 'New entry'}</div>
				<div className="space-y-2">
					<label className="block text-sm font-medium">Image URL</label>
					<input value={form.imageUrl} onChange={(e) => setField('imageUrl', e.target.value)} className="w-full border rounded px-3 py-2" placeholder="https://..." required />
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="block text-sm font-medium">Rating (0-5)</label>
						<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => setField('rating', Number(e.target.value))} className="w-full border rounded px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm font-medium">Date</label>
						<input type="date" value={`${form.date instanceof Date ? form.date.toISOString().slice(0,10) : new Date(form.date).toISOString().slice(0,10)}`} onChange={(e) => setField('date', new Date(e.target.value))} className="w-full border rounded px-3 py-2" />
					</div>
				</div>
				<div className="space-y-2">
					<label className="block text-sm font-medium">Categories (comma separated)</label>
					<input value={categoriesInput} onChange={(e) => setCategoriesInput(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Deep Conditioning, Moisture" />
				</div>
				<div className="space-y-2">
					<label className="block text-sm font-medium">Description</label>
					<textarea value={form.description} onChange={(e) => setField('description', e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
				</div>
				<div className="flex justify-end gap-3">
					<button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
					<button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">Save</button>
				</div>
			</form>
		</div>
	);
}
