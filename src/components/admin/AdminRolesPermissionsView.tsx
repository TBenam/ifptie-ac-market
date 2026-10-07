import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  CheckCircle2,
  Lock,
  UserCheck,
  ChevronRight,
  Sparkles,
  Info,
  Layers,
  KeyRound,
  Shield,
  Save,
  AlertTriangle
} from 'lucide-react';

// Specified modules for the permission matrix
export type PermissionModule =
  | 'Orders'
  | 'Products'
  | 'Customers'
  | 'Couriers'
  | 'Delivery'
  | 'Promotions'
  | 'Analytics'
  | 'Finance'
  | 'Settings';

// Specified permission actions
export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'export';

export interface ModulePermissions {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  isCustom: boolean;
  usersCount: number;
  permissions: Record<PermissionModule, ModulePermissions>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

const MODULES: { id: PermissionModule; label: string; description: string }[] = [
  { id: 'Orders', label: 'Commandes (Orders)', description: 'Traitement, statuts, validation et impressions' },
  { id: 'Products', label: 'Produits (Products)', description: 'Catalogue, fiches, prix, variantes et stocks' },
  { id: 'Customers', label: 'Clients (Customers)', description: 'Fiches clients, coordonnées WhatsApp, historique' },
  { id: 'Couriers', label: 'Livreurs (Couriers)', description: 'Profils, tournées, affectations et versements cash' },
  { id: 'Delivery', label: 'Livraison (Delivery)', description: 'Centre de contrôle, dispatch et zones tarifaires' },
  { id: 'Promotions', label: 'Promotions', description: 'Ventes flash, codes promo et bannières' },
  { id: 'Analytics', label: 'Analytics', description: 'Rapports de ventes, graphiques et métriques globales' },
  { id: 'Finance', label: 'Finances', description: 'Marge brute, coûts produits, trésorerie et rentabilité' },
  { id: 'Settings', label: 'Paramètres (Settings)', description: 'Configuration boutique, passerelles et sécurité' },
];

const ACTIONS: { id: PermissionAction; label: string }[] = [
  { id: 'view', label: 'View' },
  { id: 'create', label: 'Create' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
  { id: 'export', label: 'Export' },
];

// Default helper to build full permissions
const fullPermissions = (): ModulePermissions => ({
  view: true,
  create: true,
  edit: true,
  delete: true,
  export: true,
});

const readOnlyPermissions = (): ModulePermissions => ({
  view: true,
  create: false,
  edit: false,
  delete: false,
  export: true,
});

const nonePermissions = (): ModulePermissions => ({
  view: false,
  create: false,
  edit: false,
  delete: false,
  export: false,
});

const INITIAL_ROLES: AdminRole[] = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Accès maître sans aucune restriction sur tous les modules, configurations et données financières.',
    isCustom: false,
    usersCount: 2,
    permissions: {
      Orders: fullPermissions(),
      Products: fullPermissions(),
      Customers: fullPermissions(),
      Couriers: fullPermissions(),
      Delivery: fullPermissions(),
      Promotions: fullPermissions(),
      Analytics: fullPermissions(),
      Finance: fullPermissions(),
      Settings: fullPermissions(),
    }
  },
  {
    id: 'administrator',
    name: 'Administrator',
    description: 'Supervision générale de la plateforme commerciale, marketing et gestion quotidienne.',
    isCustom: false,
    usersCount: 3,
    permissions: {
      Orders: fullPermissions(),
      Products: fullPermissions(),
      Customers: fullPermissions(),
      Couriers: fullPermissions(),
      Delivery: fullPermissions(),
      Promotions: fullPermissions(),
      Analytics: fullPermissions(),
      Finance: readOnlyPermissions(),
      Settings: { view: true, create: false, edit: true, delete: false, export: false },
    }
  },
  {
    id: 'operations-manager',
    name: 'Operations Manager',
    description: 'Responsable du flux logistique, des commandes entrantes et de la coordination des livraisons.',
    isCustom: false,
    usersCount: 2,
    permissions: {
      Orders: fullPermissions(),
      Products: { view: true, create: false, edit: true, delete: false, export: true },
      Customers: { view: true, create: false, edit: true, delete: false, export: true },
      Couriers: fullPermissions(),
      Delivery: fullPermissions(),
      Promotions: readOnlyPermissions(),
      Analytics: readOnlyPermissions(),
      Finance: nonePermissions(),
      Settings: nonePermissions(),
    }
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Gestion du catalogue, ajouts de produits, gestion des stocks fournisseurs et tarifications.',
    isCustom: false,
    usersCount: 2,
    permissions: {
      Orders: readOnlyPermissions(),
      Products: fullPermissions(),
      Customers: nonePermissions(),
      Couriers: nonePermissions(),
      Delivery: nonePermissions(),
      Promotions: fullPermissions(),
      Analytics: { view: true, create: false, edit: false, delete: false, export: true },
      Finance: { view: true, create: false, edit: false, delete: false, export: false },
      Settings: nonePermissions(),
    }
  },
  {
    id: 'delivery-manager',
    name: 'Delivery Manager',
    description: 'Gestion de la flotte de livreurs, tournées urbaines et résolution des incidents de livraison.',
    isCustom: false,
    usersCount: 4,
    permissions: {
      Orders: { view: true, create: false, edit: true, delete: false, export: true },
      Products: { view: true, create: false, edit: false, delete: false, export: false },
      Customers: { view: true, create: false, edit: true, delete: false, export: false },
      Couriers: fullPermissions(),
      Delivery: fullPermissions(),
      Promotions: nonePermissions(),
      Analytics: { view: true, create: false, edit: false, delete: false, export: false },
      Finance: nonePermissions(),
      Settings: nonePermissions(),
    }
  },
  {
    id: 'finance-manager',
    name: 'Finance Manager',
    description: 'Gestion comptable, rapprochements Mobile Money, validation des marges et exports financiers.',
    isCustom: false,
    usersCount: 2,
    permissions: {
      Orders: { view: true, create: false, edit: false, delete: false, export: true },
      Products: { view: true, create: false, edit: false, delete: false, export: true },
      Customers: { view: true, create: false, edit: false, delete: false, export: true },
      Couriers: { view: true, create: false, edit: false, delete: false, export: true },
      Delivery: { view: true, create: false, edit: false, delete: false, export: true },
      Promotions: { view: true, create: false, edit: false, delete: false, export: true },
      Analytics: fullPermissions(),
      Finance: fullPermissions(),
      Settings: { view: true, create: false, edit: true, delete: false, export: true },
    }
  }
];

const INITIAL_USERS: AdminUser[] = [
  { id: 'u1', name: 'Alain Fotso', email: 'alain.fotso@ifptie-market.cm', phone: '+237 690 12 34 56', roleId: 'super-admin', status: 'active', lastActive: 'En ligne' },
  { id: 'u2', name: 'Michel Ebongue', email: 'm.ebongue@ifptie-market.cm', phone: '+237 677 88 99 00', roleId: 'administrator', status: 'active', lastActive: 'Il y a 15 min' },
  { id: 'u3', name: 'Carine Mballa', email: 'carine.m@ifptie-market.cm', phone: '+237 699 22 33 44', roleId: 'operations-manager', status: 'active', lastActive: 'Il y a 45 min' },
  { id: 'u4', name: 'David Tsafack', email: 'david.t@ifptie-market.cm', phone: '+237 671 44 55 66', roleId: 'product-manager', status: 'active', lastActive: 'Il y a 2h' },
  { id: 'u5', name: 'Eric Tchinda', email: 'eric.t@ifptie-market.cm', phone: '+237 698 55 66 77', roleId: 'delivery-manager', status: 'active', lastActive: 'Il y a 30 min' },
  { id: 'u6', name: 'Nathalie Ngo', email: 'nathalie.ngo@ifptie-market.cm', phone: '+237 655 11 22 33', roleId: 'finance-manager', status: 'active', lastActive: 'Il y a 3h' },
];

export const AdminRolesPermissionsView: React.FC = () => {
  const [roles, setRoles] = useState<AdminRole[]>(INITIAL_ROLES);
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('super-admin');

  // Custom role modal
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  // Toast notification
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Currently selected role
  const currentRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  // Toggle specific permission
  const handleTogglePermission = (module: PermissionModule, action: PermissionAction) => {
    if (currentRole.id === 'super-admin') {
      showToast('Le rôle Super Admin conserve tous les privilèges par défaut.');
      return;
    }

    setRoles(prevRoles =>
      prevRoles.map(r => {
        if (r.id === currentRole.id) {
          const currentVal = r.permissions[module][action];
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [module]: {
                ...r.permissions[module],
                [action]: !currentVal
              }
            }
          };
        }
        return r;
      })
    );
  };

  // Toggle all actions for a module
  const handleToggleRow = (module: PermissionModule) => {
    if (currentRole.id === 'super-admin') return;

    const row = currentRole.permissions[module];
    const allChecked = row.view && row.create && row.edit && row.delete && row.export;

    setRoles(prevRoles =>
      prevRoles.map(r => {
        if (r.id === currentRole.id) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [module]: {
                view: !allChecked,
                create: !allChecked,
                edit: !allChecked,
                delete: !allChecked,
                export: !allChecked,
              }
            }
          };
        }
        return r;
      })
    );
  };

  // Toggle all modules for an action column
  const handleToggleColumn = (action: PermissionAction) => {
    if (currentRole.id === 'super-admin') return;

    const allChecked = MODULES.every(m => currentRole.permissions[m.id][action]);

    setRoles(prevRoles =>
      prevRoles.map(r => {
        if (r.id === currentRole.id) {
          const updatedPerms = { ...r.permissions };
          MODULES.forEach(m => {
            updatedPerms[m.id] = {
              ...updatedPerms[m.id],
              [action]: !allChecked
            };
          });
          return {
            ...r,
            permissions: updatedPerms
          };
        }
        return r;
      })
    );
  };

  // Create custom role
  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newId = `custom-role-${Date.now()}`;
    const initialPerms: Record<PermissionModule, ModulePermissions> = {
      Orders: nonePermissions(),
      Products: nonePermissions(),
      Customers: nonePermissions(),
      Couriers: nonePermissions(),
      Delivery: nonePermissions(),
      Promotions: nonePermissions(),
      Analytics: nonePermissions(),
      Finance: nonePermissions(),
      Settings: nonePermissions(),
    };

    const createdRole: AdminRole = {
      id: newId,
      name: newRoleName.trim(),
      description: newRoleDescription.trim() || 'Rôle personnalisé configuré par l administrateur.',
      isCustom: true,
      usersCount: 0,
      permissions: initialPerms
    };

    setRoles(prev => [...prev, createdRole]);
    setSelectedRoleId(newId);
    setIsCreatingRole(false);
    setNewRoleName('');
    setNewRoleDescription('');
    showToast(`Rôle personnalisé « ${createdRole.name} » créé avec succès ! Configurez maintenant la matrice.`);
  };

  // Delete custom role
  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce rôle personnalisé ?')) {
      setRoles(prev => prev.filter(r => r.id !== roleId));
      setSelectedRoleId('super-admin');
      showToast('Rôle supprimé avec succès.');
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toast}</span>
        </div>
      )}

      {/* HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b5738',
              boxShadow: '0 2px 5px rgba(11,87,56,0.12)'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Rôles & Permissions Administrateur
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '2px 0 0' }}>
                Matrice de contrôle d'accès granulaire (View, Create, Edit, Delete, Export) par module
              </p>
            </div>
          </div>
        </div>

        {/* CTA: Create Custom Role */}
        <button
          onClick={() => setIsCreatingRole(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: '#0b5738',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(11,87,56,0.25)',
            transition: 'all 0.15s ease'
          }}
        >
          <Plus size={16} />
          <span>Créer un rôle personnalisé</span>
        </button>
      </div>

      {/* ROLES SELECTOR CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '14px',
        marginBottom: '24px'
      }}>
        {roles.map((role) => {
          const isSelected = selectedRoleId === role.id;

          return (
            <div
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '16px',
                border: isSelected ? '2px solid #0b5738' : '1px solid #e2e8f0',
                boxShadow: isSelected ? '0 4px 12px rgba(11,87,56,0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: isSelected ? '#0b5738' : '#0f172a' }}>
                  {role.name}
                </span>

                {role.isCustom && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    backgroundColor: '#fef3c7',
                    color: '#b45309',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    Custom
                  </span>
                )}
              </div>

              <p style={{
                fontSize: '0.75rem',
                color: '#64748b',
                margin: '0 0 10px',
                lineHeight: '1.4',
                minHeight: '32px'
              }}>
                {role.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #f1f5f9', paddingTop: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                  {role.usersCount} utilisateurs assignés
                </span>

                {role.isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role.id);
                    }}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                    title="Supprimer ce rôle"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          PERMISSION MATRIX TABLE
         ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        marginBottom: '28px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} color="#0b5738" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Matrice des Permissions : {currentRole.name}
              </h2>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
              Cochez ou décochez les privilèges pour chaque module système
            </p>
          </div>

          <button
            onClick={() => showToast(`Matrice du rôle « ${currentRole.name} » enregistrée avec succès !`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#0b5738',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Save size={15} />
            <span>Enregistrer la matrice</span>
          </button>
        </div>

        {/* Matrix Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#475569', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '14px 18px', minWidth: '220px' }}>Module Système</th>
                {ACTIONS.map((action) => (
                  <th
                    key={action.id}
                    onClick={() => handleToggleColumn(action.id)}
                    style={{ padding: '14px 18px', textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
                    title="Cliquer pour tout cocher/décocher dans cette colonne"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <span>{action.label}</span>
                      <span style={{ fontSize: '0.625rem', color: '#94a3b8' }}>⇅</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((module) => {
                const rowPerms = currentRole.permissions[module.id];

                return (
                  <tr key={module.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}>
                    {/* Module Title & Quick Row Toggle */}
                    <td style={{ padding: '14px 18px' }}>
                      <div
                        onClick={() => handleToggleRow(module.id)}
                        style={{ cursor: 'pointer', display: 'inline-block' }}
                        title="Cliquer pour cocher/décocher toute la ligne"
                      >
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{module.label}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{module.description}</div>
                      </div>
                    </td>

                    {/* Checkboxes for each action: View, Create, Edit, Delete, Export */}
                    {ACTIONS.map((action) => {
                      const isChecked = rowPerms[action.id];

                      return (
                        <td key={action.id} style={{ padding: '14px 18px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleTogglePermission(module.id, action.id)}
                            disabled={currentRole.id === 'super-admin'}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: '#0b5738',
                              cursor: currentRole.id === 'super-admin' ? 'not-allowed' : 'pointer'
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          USERS ASSIGNED TO ROLES SECTION
         ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Utilisateurs Administrateurs & Affectations
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
              Assignez ou modifiez le rôle des membres de l'équipe IFPTIE Market
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px 14px' }}>Nom & Prénom</th>
                <th style={{ padding: '10px 14px' }}>Email</th>
                <th style={{ padding: '10px 14px' }}>Téléphone</th>
                <th style={{ padding: '10px 14px' }}>Rôle assigné</th>
                <th style={{ padding: '10px 14px' }}>Statut</th>
                <th style={{ padding: '10px 14px' }}>Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{u.name}</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>{u.email}</td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>{u.phone}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <select
                        value={u.roleId}
                        onChange={(e) => {
                          const newRoleId = e.target.value;
                          setUsers(prev => prev.map(user => user.id === u.id ? { ...user, roleId: newRoleId } : user));
                          showToast(`Rôle de ${u.name} mis à jour.`);
                        }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          backgroundColor: '#ffffff',
                          color: '#0f172a'
                        }}
                      >
                        {roles.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem' }}>
                        ● Actif
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>{u.lastActive}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          MODAL: CREATE CUSTOM ROLE
         ========================================================================= */}
      {isCreatingRole && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15,23,42,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '520px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Shield size={22} color="#0b5738" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Créer un rôle personnalisé
              </h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 20px' }}>
              Définissez un nouveau profil d'équipe puis ajustez sa matrice de permissions (View, Create, Edit, Delete, Export).
            </p>

            <form onSubmit={handleCreateCustomRole}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Nom du rôle personnalisé :
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Agent Support WhatsApp, Superviseur Nord"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Description des responsabilités :
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez les attributions et limites de ce rôle..."
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreatingRole(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={15} />
                  <span>Créer le rôle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
