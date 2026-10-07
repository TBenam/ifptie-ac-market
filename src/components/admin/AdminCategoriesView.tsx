import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Folder,
  FolderTree,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  MoveUp,
  MoveDown,
  Star,
  Check,
  X,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Layers,
  Search,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
  isFeatured: boolean;
  isEnabled: boolean;
  parentId: string | null;
  subcategories: CategoryItem[];
}

export const AdminCategoriesView: React.FC = () => {
  const { addToast } = useStore();

  // Initial categories matching prompt example and extended catalog
  const initialCategories: CategoryItem[] = [
    {
      id: 'cat-solar',
      name: 'Énergie & Solaire',
      slug: 'energie-solaire',
      description: 'Kits solaires autonomes, lampadaires anti-délestage, batteries LiFePO4 et accessoires au Cameroun.',
      itemCount: 119,
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      isEnabled: true,
      parentId: null,
      subcategories: [
        {
          id: 'sub-solar-1',
          name: 'Lampes solaires',
          slug: 'lampes-solaires',
          description: 'Projecteurs LED, lanternes portables et éclairage de cour.',
          itemCount: 48,
          image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&auto=format&fit=crop&q=80',
          isFeatured: true,
          isEnabled: true,
          parentId: 'cat-solar',
          subcategories: []
        },
        {
          id: 'sub-solar-2',
          name: 'Panneaux solaires',
          slug: 'panneaux-solaires',
          description: 'Panneaux monocristallins et polycristallins 100W à 600W.',
          itemCount: 35,
          image: 'https://images.unsplash.com/photo-1508873696983-2df57046475b?w=400&auto=format&fit=crop&q=80',
          isFeatured: true,
          isEnabled: true,
          parentId: 'cat-solar',
          subcategories: []
        },
        {
          id: 'sub-solar-3',
          name: 'Batteries',
          slug: 'batteries-solaires',
          description: 'Batteries gel et lithium LiFePO4 haute capacité.',
          itemCount: 22,
          image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&auto=format&fit=crop&q=80',
          isFeatured: false,
          isEnabled: true,
          parentId: 'cat-solar',
          subcategories: []
        },
        {
          id: 'sub-solar-4',
          name: 'Onduleurs',
          slug: 'onduleurs-convertisseurs',
          description: 'Convertisseurs pur sinus 12V/24V vers 220V.',
          itemCount: 14,
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80',
          isFeatured: false,
          isEnabled: true,
          parentId: 'cat-solar',
          subcategories: []
        }
      ]
    },
    {
      id: 'cat-home',
      name: 'Maison & Cuisine',
      slug: 'maison-cuisine',
      description: 'Appareils électroménagers pratiques, hachoirs puissants, robots et conservation.',
      itemCount: 99,
      image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      isEnabled: true,
      parentId: null,
      subcategories: [
        {
          id: 'sub-home-1',
          name: 'Cuisine',
          slug: 'ustensiles-robots-cuisine',
          description: 'Robots hachoirs inox, mixeurs plongeants, friteuses sans huile.',
          itemCount: 52,
          image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=400&auto=format&fit=crop&q=80',
          isFeatured: true,
          isEnabled: true,
          parentId: 'cat-home',
          subcategories: []
        },
        {
          id: 'sub-home-2',
          name: 'Rangement',
          slug: 'rangement-organisation',
          description: 'Étagères modulables, boîtes hermétiques et organisateurs.',
          itemCount: 28,
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&auto=format&fit=crop&q=80',
          isFeatured: false,
          isEnabled: true,
          parentId: 'cat-home',
          subcategories: []
        },
        {
          id: 'sub-home-3',
          name: 'Nettoyage',
          slug: 'nettoyage-entretien',
          description: 'Balais rotatifs, aspirateurs rechargeables et brosses électriques.',
          itemCount: 19,
          image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
          isFeatured: false,
          isEnabled: true,
          parentId: 'cat-home',
          subcategories: []
        }
      ]
    },
    {
      id: 'cat-tech',
      name: 'High-Tech & Accessoires',
      slug: 'high-tech-accessoires',
      description: 'Powerbanks ultra-rapides, audio Bluetooth, montres connectées et caméras.',
      itemCount: 145,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      isEnabled: true,
      parentId: null,
      subcategories: [
        {
          id: 'sub-tech-1',
          name: 'Écouteurs & Audio',
          slug: 'ecouteurs-audio-bluetooth',
          description: 'Écouteurs TWS sans fil, casques réducteurs de bruit et enceintes.',
          itemCount: 64,
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80',
          isFeatured: true,
          isEnabled: true,
          parentId: 'cat-tech',
          subcategories: []
        },
        {
          id: 'sub-tech-2',
          name: 'Power Banks & Chargeurs',
          slug: 'power-banks-chargeurs',
          description: 'Batteries externes 20 000 à 50 000 mAh avec charge rapide.',
          itemCount: 41,
          image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&auto=format&fit=crop&q=80',
          isFeatured: true,
          isEnabled: true,
          parentId: 'cat-tech',
          subcategories: []
        },
        {
          id: 'sub-tech-3',
          name: 'Montres connectées',
          slug: 'montres-connectees-smartwatches',
          description: 'Smartwatches avec suivi de santé, appels Bluetooth et autonomie longue.',
          itemCount: 25,
          image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=80',
          isFeatured: false,
          isEnabled: true,
          parentId: 'cat-tech',
          subcategories: []
        }
      ]
    },
    {
      id: 'cat-beauty',
      name: 'Beauté & Bien-être Naturel',
      slug: 'beaute-bien-etre',
      description: 'Produits naturels camerounais, beurre de karité bio de Kribi, huiles végétales.',
      itemCount: 76,
      image: 'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      isEnabled: true,
      parentId: null,
      subcategories: [
        {
          id: 'sub-beauty-1',
          name: 'Karité & Soins bio Kribi',
          slug: 'karite-soins-bio',
          description: 'Beurre de karité pur non raffiné pressé artisanalement.',
          itemCount: 38,
          image: 'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=400&auto=format&fit=crop&q=80',
          isFeatured: true,
          isEnabled: true,
          parentId: 'cat-beauty',
          subcategories: []
        },
        {
          id: 'sub-beauty-2',
          name: 'Huiles & Essences végétales',
          slug: 'huiles-vegetales-naturelles',
          description: 'Huile de ricin noir, carotte, neem et palmiste pressées à froid.',
          itemCount: 24,
          image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&auto=format&fit=crop&q=80',
          isFeatured: false,
          isEnabled: true,
          parentId: 'cat-beauty',
          subcategories: []
        }
      ]
    }
  ];

  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [expandedCats, setExpandedCats] = useState<string[]>(['cat-solar', 'cat-home', 'cat-tech', 'cat-beauty']);
  const [searchFilter, setSearchFilter] = useState('');

  // Drag and Drop state
  const [draggedItem, setDraggedItem] = useState<{ id: string; parentId: string | null } | null>(null);

  // Modals state
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [targetCat, setTargetCat] = useState<CategoryItem | null>(null);
  const [parentForNewSub, setParentForNewSub] = useState<string | null>(null);

  // Modal Form state
  const [formName, setFormName] = useState('');
  const [formParentId, setFormParentId] = useState<string | null>(null);
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsEnabled, setFormIsEnabled] = useState(true);

  // Toggle Collapse
  const toggleExpand = (id: string) => {
    setExpandedCats(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Open Add Modal
  const openAddModal = (parentId: string | null = null) => {
    setModalMode('add');
    setTargetCat(null);
    setParentForNewSub(parentId);
    setFormName('');
    setFormParentId(parentId);
    setFormSlug('');
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80');
    setFormIsFeatured(false);
    setFormIsEnabled(true);
  };

  // Open Edit Modal
  const openEditModal = (cat: CategoryItem) => {
    setModalMode('edit');
    setTargetCat(cat);
    setFormName(cat.name);
    setFormParentId(cat.parentId);
    setFormSlug(cat.slug);
    setFormDescription(cat.description || '');
    setFormImage(cat.image || '');
    setFormIsFeatured(cat.isFeatured);
    setFormIsEnabled(cat.isEnabled);
  };

  // Form Name change with auto-slug
  const handleNameChange = (val: string) => {
    setFormName(val);
    setFormSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    );
  };

  // Save Modal Submit
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      addToast('Veuillez spécifier le nom de la catégorie', 'warning');
      return;
    }

    if (modalMode === 'add') {
      const newCategory: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: formName.trim(),
        slug: formSlug.trim() || `cat-${Date.now()}`,
        description: formDescription.trim(),
        itemCount: 0,
        image: formImage || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
        isFeatured: formIsFeatured,
        isEnabled: formIsEnabled,
        parentId: formParentId,
        subcategories: []
      };

      if (!formParentId) {
        // Add top-level parent category
        setCategories([...categories, newCategory]);
        setExpandedCats([...expandedCats, newCategory.id]);
        addToast(`✓ Catégorie parente "${newCategory.name}" créée avec succès !`, 'success');
      } else {
        // Add subcategory to parent
        setCategories(categories.map(parent => {
          if (parent.id === formParentId) {
            return {
              ...parent,
              subcategories: [...parent.subcategories, newCategory]
            };
          }
          return parent;
        }));
        if (!expandedCats.includes(formParentId)) {
          setExpandedCats([...expandedCats, formParentId]);
        }
        addToast(`✓ Sous-catégorie "${newCategory.name}" ajoutée !`, 'success');
      }
    } else if (modalMode === 'edit' && targetCat) {
      // Edit existing category
      const updatedCat: CategoryItem = {
        ...targetCat,
        name: formName.trim(),
        slug: formSlug.trim(),
        description: formDescription.trim(),
        image: formImage,
        isFeatured: formIsFeatured,
        isEnabled: formIsEnabled,
        parentId: formParentId
      };

      if (!targetCat.parentId) {
        // Update top-level category
        setCategories(categories.map(c => c.id === targetCat.id ? { ...updatedCat, subcategories: c.subcategories } : c));
      } else {
        // Update subcategory
        setCategories(categories.map(parent => {
          if (parent.id === targetCat.parentId) {
            return {
              ...parent,
              subcategories: parent.subcategories.map(sub => sub.id === targetCat.id ? updatedCat : sub)
            };
          }
          return parent;
        }));
      }
      addToast(`✓ Catégorie "${updatedCat.name}" mise à jour !`, 'success');
    }

    setModalMode(null);
  };

  // Toggle Featured (Set featured)
  const handleToggleFeatured = (cat: CategoryItem) => {
    const nextVal = !cat.isFeatured;
    if (!cat.parentId) {
      setCategories(categories.map(c => c.id === cat.id ? { ...c, isFeatured: nextVal } : c));
    } else {
      setCategories(categories.map(parent => {
        if (parent.id === cat.parentId) {
          return {
            ...parent,
            subcategories: parent.subcategories.map(sub => sub.id === cat.id ? { ...sub, isFeatured: nextVal } : sub)
          };
        }
        return parent;
      }));
    }
    addToast(nextVal ? `⭐ "${cat.name}" mise en avant sur l'accueil !` : `"${cat.name}" retirée de la mise en avant`, 'info');
  };

  // Enable/Disable category
  const handleToggleEnabled = (cat: CategoryItem) => {
    const nextVal = !cat.isEnabled;
    if (!cat.parentId) {
      setCategories(categories.map(c => c.id === cat.id ? { ...c, isEnabled: nextVal } : c));
    } else {
      setCategories(categories.map(parent => {
        if (parent.id === cat.parentId) {
          return {
            ...parent,
            subcategories: parent.subcategories.map(sub => sub.id === cat.id ? { ...sub, isEnabled: nextVal } : sub)
          };
        }
        return parent;
      }));
    }
    addToast(nextVal ? `✓ Catégorie "${cat.name}" activée` : `⏸️ Catégorie "${cat.name}" désactivée`, 'info');
  };

  // Delete Category
  const handleDeleteCategory = (cat: CategoryItem) => {
    const isParent = !cat.parentId;
    const msg = isParent
      ? `Voulez-vous vraiment supprimer la catégorie "${cat.name}" et ses ${cat.subcategories.length} sous-catégorie(s) ?`
      : `Voulez-vous supprimer la sous-catégorie "${cat.name}" ?`;

    if (window.confirm(msg)) {
      if (isParent) {
        setCategories(categories.filter(c => c.id !== cat.id));
      } else {
        setCategories(categories.map(parent => {
          if (parent.id === cat.parentId) {
            return {
              ...parent,
              subcategories: parent.subcategories.filter(sub => sub.id !== cat.id)
            };
          }
          return parent;
        }));
      }
      addToast(`✕ Catégorie "${cat.name}" supprimée`, 'warning');
    }
  };

  // Reorder Parent Category (Move Up / Down)
  const handleMoveParent = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= categories.length) return;
    const copy = [...categories];
    const item = copy.splice(index, 1)[0];
    copy.splice(targetIdx, 0, item);
    setCategories(copy);
    addToast('Ordre des catégories mis à jour', 'info');
  };

  // Reorder Subcategory (Move Up / Down)
  const handleMoveSub = (parentId: string, index: number, direction: 'up' | 'down') => {
    setCategories(categories.map(parent => {
      if (parent.id === parentId) {
        const targetIdx = direction === 'up' ? index - 1 : index + 1;
        if (targetIdx < 0 || targetIdx >= parent.subcategories.length) return parent;
        const subCopy = [...parent.subcategories];
        const item = subCopy.splice(index, 1)[0];
        subCopy.splice(targetIdx, 0, item);
        return { ...parent, subcategories: subCopy };
      }
      return parent;
    }));
    addToast('Ordre des sous-catégories mis à jour', 'info');
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string, parentId: string | null) => {
    setDraggedItem({ id, parentId });
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnParent = (e: React.DragEvent, targetParentId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.parentId === null) {
      // Reordering top parents
      const fromIdx = categories.findIndex(c => c.id === draggedItem.id);
      const toIdx = categories.findIndex(c => c.id === targetParentId);
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        const copy = [...categories];
        const item = copy.splice(fromIdx, 1)[0];
        copy.splice(toIdx, 0, item);
        setCategories(copy);
        addToast('Hiérarchie mise à jour par glisser-déposer', 'success');
      }
    }
    setDraggedItem(null);
  };

  const handleDropOnSub = (e: React.DragEvent, targetSubId: string, parentId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.parentId !== parentId) return;

    // Reordering within the same parent
    setCategories(categories.map(parent => {
      if (parent.id === parentId) {
        const fromIdx = parent.subcategories.findIndex(s => s.id === draggedItem.id);
        const toIdx = parent.subcategories.findIndex(s => s.id === targetSubId);
        if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
          const subCopy = [...parent.subcategories];
          const item = subCopy.splice(fromIdx, 1)[0];
          subCopy.splice(toIdx, 0, item);
          return { ...parent, subcategories: subCopy };
        }
      }
      return parent;
    }));
    addToast('Hiérarchie sous-catégorie réordonnée', 'success');
    setDraggedItem(null);
  };

  // Filtered categories
  const filteredCategories = categories.filter(c => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    const matchParent = c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    const matchSub = c.subcategories.some(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    return matchParent || matchSub;
  });

  const totalCategoriesCount = categories.length;
  const totalSubcategoriesCount = categories.reduce((acc, c) => acc + c.subcategories.length, 0);

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* 1. PAGE HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Catégories
            </h1>
            <span style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              {totalCategoriesCount} rayons • {totalSubcategoriesCount} sous-catégories
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '4px 0 0' }}>
            Structure arborescente des rayons, visuels, mise en avant sur l'accueil et ordonnancement par glisser-déposer.
          </p>
        </div>

        {/* Top Actions: Add Category */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setExpandedCats(expandedCats.length === categories.length ? [] : categories.map(c => c.id))}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FolderTree size={16} />
            <span>{expandedCats.length === categories.length ? 'Tout réduire' : 'Tout déplier'}</span>
          </button>

          <button
            onClick={() => openAddModal(null)}
            style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 18px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(11,87,56,0.25)'
            }}
          >
            <Plus size={16} />
            <span>Add category (Ajouter un rayon)</span>
          </button>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Filtrer une catégorie (ex: Énergie & Solaire, Cuisine, Lampes...)"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748b' }}>
          <GripVertical size={14} color="#0b5738" />
          <span>Glissez-déposez la poignée pour réordonner les catégories et sous-catégories</span>
        </div>
      </div>

      {/* 3. CATEGORY HIERARCHY TREE */}
      <div style={{ display: 'grid', gap: '14px' }}>
        {filteredCategories.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            color: '#64748b'
          }}>
            <AlertCircle size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Aucune catégorie trouvée</div>
            <p style={{ fontSize: '0.8125rem', margin: '4px 0 14px' }}>Aucun rayon ne correspond au filtre "{searchFilter}".</p>
            <button
              onClick={() => setSearchFilter('')}
              style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', fontWeight: 700 }}
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          filteredCategories.map((parentCat, parentIdx) => {
            const isExpanded = expandedCats.includes(parentCat.id);

            return (
              <div
                key={parentCat.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnParent(e, parentCat.id)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: parentCat.isFeatured ? '1.5px solid #0b5738' : '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* PARENT CATEGORY HEADER ROW */}
                <div style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  backgroundColor: parentCat.isEnabled ? (parentCat.isFeatured ? '#f0fdf4' : '#ffffff') : '#f8fafc',
                  borderBottom: isExpanded ? '1px solid #f1f5f9' : 'none'
                }}>
                  
                  {/* Left: Drag Handle, Expand icon, Image, Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Drag Handle */}
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, parentCat.id, null)}
                      title="Glisser pour réordonner ce rayon"
                      style={{ cursor: 'grab', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
                    >
                      <GripVertical size={18} />
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => toggleExpand(parentCat.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {/* Image Thumbnail */}
                    <div style={{ position: 'relative' }}>
                      <img
                        src={parentCat.image}
                        alt={parentCat.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1'
                        }}
                      />
                      <button
                        onClick={() => openEditModal(parentCat)}
                        title="Changer l'image"
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          right: '-4px',
                          backgroundColor: '#0b5738',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <ImageIcon size={10} />
                      </button>
                    </div>

                    {/* Text Title & Subcount */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: parentCat.isEnabled ? '#0f172a' : '#64748b' }}>
                          {parentCat.name}
                        </span>

                        {parentCat.isFeatured && (
                          <span style={{
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}>
                            <Star size={10} fill="#92400e" /> En vedette
                          </span>
                        )}

                        {!parentCat.isEnabled && (
                          <span style={{
                            backgroundColor: '#f1f5f9',
                            color: '#64748b',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '4px'
                          }}>
                            Désactivé
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        <span>slug: <code>{parentCat.slug}</code></span> •{' '}
                        <strong>{parentCat.subcategories.length} sous-catégories</strong> •{' '}
                        <span>{parentCat.itemCount} produits actifs</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick actions (Move Up/Down, Set featured, Enable/Disable, Edit, Add sub, Delete) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    
                    {/* Reorder Buttons (Move Up / Down fallback) */}
                    <div style={{ display: 'inline-flex', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
                      <button
                        onClick={() => handleMoveParent(parentIdx, 'up')}
                        disabled={parentIdx === 0}
                        title="Monter"
                        style={{
                          backgroundColor: '#ffffff',
                          border: 'none',
                          borderRight: '1px solid #cbd5e1',
                          padding: '6px 8px',
                          cursor: parentIdx === 0 ? 'not-allowed' : 'pointer',
                          color: parentIdx === 0 ? '#cbd5e1' : '#334155'
                        }}
                      >
                        <MoveUp size={13} />
                      </button>
                      <button
                        onClick={() => handleMoveParent(parentIdx, 'down')}
                        disabled={parentIdx === categories.length - 1}
                        title="Descendre"
                        style={{
                          backgroundColor: '#ffffff',
                          border: 'none',
                          padding: '6px 8px',
                          cursor: parentIdx === categories.length - 1 ? 'not-allowed' : 'pointer',
                          color: parentIdx === categories.length - 1 ? '#cbd5e1' : '#334155'
                        }}
                      >
                        <MoveDown size={13} />
                      </button>
                    </div>

                    {/* Set featured star button */}
                    <button
                      onClick={() => handleToggleFeatured(parentCat)}
                      title={parentCat.isFeatured ? 'Retirer de la mise en avant' : 'Mettre en avant sur l\'accueil (Featured)'}
                      style={{
                        backgroundColor: parentCat.isFeatured ? '#fef3c7' : '#f1f5f9',
                        color: parentCat.isFeatured ? '#b45309' : '#64748b',
                        border: '1px solid',
                        borderColor: parentCat.isFeatured ? '#fde68a' : '#cbd5e1',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Star size={13} fill={parentCat.isFeatured ? '#b45309' : 'none'} />
                      <span>{parentCat.isFeatured ? 'Featured' : 'Mettre en avant'}</span>
                    </button>

                    {/* Enable/Disable toggle */}
                    <button
                      onClick={() => handleToggleEnabled(parentCat)}
                      title={parentCat.isEnabled ? 'Désactiver le rayon' : 'Activer le rayon'}
                      style={{
                        backgroundColor: parentCat.isEnabled ? '#ecfdf5' : '#f1f5f9',
                        color: parentCat.isEnabled ? '#047857' : '#64748b',
                        border: '1px solid',
                        borderColor: parentCat.isEnabled ? '#a7f3d0' : '#cbd5e1',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {parentCat.isEnabled ? <Check size={13} /> : <EyeOff size={13} />}
                      <span>{parentCat.isEnabled ? 'Actif' : 'Désactivé'}</span>
                    </button>

                    {/* Add Subcategory button */}
                    <button
                      onClick={() => openAddModal(parentCat.id)}
                      title="Ajouter une sous-catégorie à ce rayon"
                      style={{
                        backgroundColor: '#ecfdf5',
                        color: '#065f46',
                        border: '1px solid #a7f3d0',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={13} />
                      <span>Ajouter sous-catégorie</span>
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => openEditModal(parentCat)}
                      title="Modifier les détails"
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteCategory(parentCat)}
                      title="Supprimer la catégorie"
                      style={{
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '6px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* SUBCATEGORIES ACCORDION / HIERARCHY LIST */}
                {isExpanded && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '12px 18px 16px 42px' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                      Sous-catégories de {parentCat.name} :
                    </div>

                    {parentCat.subcategories.length === 0 ? (
                      <div style={{
                        padding: '16px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        border: '1px dashed #cbd5e1',
                        textAlign: 'center',
                        color: '#64748b',
                        fontSize: '0.8125rem'
                      }}>
                        Aucune sous-catégorie définie.
                        <button
                          onClick={() => openAddModal(parentCat.id)}
                          style={{
                            marginLeft: '10px',
                            color: '#0b5738',
                            fontWeight: 800,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          + Ajouter la première sous-catégorie
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {parentCat.subcategories.map((sub, subIdx) => (
                          <div
                            key={sub.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDropOnSub(e, sub.id, parentCat.id)}
                            style={{
                              backgroundColor: sub.isEnabled ? '#ffffff' : '#f1f5f9',
                              border: sub.isFeatured ? '1px solid #f59e0b' : '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '10px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '10px',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                            }}
                          >
                            {/* Left: Drag Handle, Icon/Image, Subcategory Title */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {/* Sub Drag Handle */}
                              <div
                                draggable
                                onDragStart={(e) => handleDragStart(e, sub.id, parentCat.id)}
                                title="Glisser pour réordonner cette sous-catégorie"
                                style={{ cursor: 'grab', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
                              >
                                <GripVertical size={16} />
                              </div>

                              {/* Small Image Thumbnail */}
                              <img
                                src={sub.image}
                                alt={sub.name}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  border: '1px solid #cbd5e1'
                                }}
                              />

                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: sub.isEnabled ? '#0f172a' : '#64748b' }}>
                                    {sub.name}
                                  </span>
                                  {sub.isFeatured && (
                                    <span style={{ fontSize: '0.625rem', fontWeight: 800, backgroundColor: '#fef3c7', color: '#92400e', padding: '1px 5px', borderRadius: '3px' }}>
                                      ⭐ Featured
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                                  slug: <code>{sub.slug}</code> • {sub.itemCount} articles
                                </div>
                              </div>
                            </div>

                            {/* Right: Subcategory Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              
                              {/* Sub Move Up/Down buttons */}
                              <div style={{ display: 'inline-flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                                <button
                                  onClick={() => handleMoveSub(parentCat.id, subIdx, 'up')}
                                  disabled={subIdx === 0}
                                  title="Monter"
                                  style={{
                                    backgroundColor: '#ffffff',
                                    border: 'none',
                                    borderRight: '1px solid #cbd5e1',
                                    padding: '4px 6px',
                                    cursor: subIdx === 0 ? 'not-allowed' : 'pointer',
                                    color: subIdx === 0 ? '#cbd5e1' : '#334155'
                                  }}
                                >
                                  <MoveUp size={11} />
                                </button>
                                <button
                                  onClick={() => handleMoveSub(parentCat.id, subIdx, 'down')}
                                  disabled={subIdx === parentCat.subcategories.length - 1}
                                  title="Descendre"
                                  style={{
                                    backgroundColor: '#ffffff',
                                    border: 'none',
                                    padding: '4px 6px',
                                    cursor: subIdx === parentCat.subcategories.length - 1 ? 'not-allowed' : 'pointer',
                                    color: subIdx === parentCat.subcategories.length - 1 ? '#cbd5e1' : '#334155'
                                  }}
                                >
                                  <MoveDown size={11} />
                                </button>
                              </div>

                              {/* Sub Featured toggle */}
                              <button
                                onClick={() => handleToggleFeatured(sub)}
                                title={sub.isFeatured ? 'Retirer de la mise en avant' : 'Mettre en avant (Featured)'}
                                style={{
                                  backgroundColor: sub.isFeatured ? '#fef3c7' : '#f8fafc',
                                  color: sub.isFeatured ? '#b45309' : '#64748b',
                                  border: '1px solid',
                                  borderColor: sub.isFeatured ? '#fde68a' : '#cbd5e1',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Star size={12} fill={sub.isFeatured ? '#b45309' : 'none'} />
                              </button>

                              {/* Sub Enable/Disable */}
                              <button
                                onClick={() => handleToggleEnabled(sub)}
                                title={sub.isEnabled ? 'Désactiver' : 'Activer'}
                                style={{
                                  backgroundColor: sub.isEnabled ? '#ecfdf5' : '#f1f5f9',
                                  color: sub.isEnabled ? '#047857' : '#64748b',
                                  border: '1px solid',
                                  borderColor: sub.isEnabled ? '#a7f3d0' : '#cbd5e1',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '0.6875rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                {sub.isEnabled ? 'Actif' : 'Off'}
                              </button>

                              {/* Sub Edit */}
                              <button
                                onClick={() => openEditModal(sub)}
                                title="Modifier la sous-catégorie"
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  color: '#334155',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '0.6875rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                <Edit size={11} />
                              </button>

                              {/* Sub Delete */}
                              <button
                                onClick={() => handleDeleteCategory(sub)}
                                title="Supprimer la sous-catégorie"
                                style={{
                                  backgroundColor: '#fef2f2',
                                  color: '#dc2626',
                                  border: '1px solid #fecaca',
                                  borderRadius: '6px',
                                  padding: '4px 6px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. MODAL: ADD / EDIT CATEGORY */}
      {modalMode && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '520px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderTree size={20} color="#0b5738" />
                {modalMode === 'add'
                  ? (formParentId ? 'Ajouter une sous-catégorie' : 'Add category (Ajouter un rayon parent)')
                  : `Modifier : ${targetCat?.name}`}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: 'grid', gap: '14px' }}>
              
              {/* Parent Category Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  Hiérarchie parente (Emplacement)
                </label>
                <select
                  value={formParentId || ''}
                  onChange={(e) => setFormParentId(e.target.value ? e.target.value : null)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', backgroundColor: '#ffffff' }}
                >
                  <option value="">📂 Aucune (Rayon parent de premier niveau)</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      ↳ Sous-catégorie de : {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lampes solaires ou Maison & Cuisine"
                  value={formName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', fontWeight: 700, boxSizing: 'border-box' }}
                />
              </div>

              {/* Slug */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  Slug URL (identifiant web)
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="Ex: lampes-solaires"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', fontFamily: 'monospace', boxSizing: 'border-box' }}
                />
              </div>

              {/* Upload image */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  Upload image (Visuel d'illustration de la catégorie)
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                  <img
                    src={formImage || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80'}
                    alt="Aperçu"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
                <div style={{
                  border: '1px dashed #cbd5e1',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.75rem',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
                onClick={() => addToast('Image sélectionnée avec succès', 'info')}
                >
                  <Upload size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  <span>Cliquez pour simuler le téléversement d'un fichier image (JPG, PNG, WebP)</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  Description de la catégorie
                </label>
                <textarea
                  rows={2}
                  placeholder="Décrivez les produits regroupés sous cette rubrique..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* Toggles: Set featured & Enable/disable */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px 0', borderTop: '1px solid #f1f5f9' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#f59e0b' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#0f172a' }}>Set featured</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Afficher sur la page d'accueil</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formIsEnabled}
                    onChange={(e) => setFormIsEnabled(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#0b5738' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#0f172a' }}>Enable category</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Activer sur le catalogue public</div>
                  </div>
                </label>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#0b5738', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}
                >
                  {modalMode === 'add' ? 'Créer la catégorie' : 'Enregistrer modifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
