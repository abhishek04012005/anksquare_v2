'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiMail, FiPhone, FiMessageSquare, FiCheck, FiX,
    FiArchive, FiSearch, FiFilter, FiClock, FiCheckCircle
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import styles from './Dashboard.module.css'

interface Contact {
    id: string
    name: string
    number: string
    subject: string
    message: string
    status: 'new' | 'read' | 'archived'
    created_at: string
    type: 'contact'
}

interface Enquiry {
    id: string
    name: string
    phone: string
    service: string
    status: 'pending' | 'contacted' | 'completed' | 'archived'
    created_at: string
    type: 'enquiry'
}

type DashboardItem = Contact | Enquiry
type ViewType = 'all' | 'contacts' | 'enquiries'
type StatusFilter = 'all' | 'new' | 'read' | 'archived' | 'pending' | 'contacted' | 'completed'

const AdminDashboard = () => {
    const [items, setItems] = useState<DashboardItem[]>([])
    const [loading, setLoading] = useState(true)
    const [currentView, setCurrentView] = useState<ViewType>('all')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const { data: contacts, error: contactsError } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            const { data: enquiries, error: enquiriesError } = await supabase
                .from('quotes')
                .select('*')
                .order('created_at', { ascending: false })

            if (contactsError) throw contactsError
            if (enquiriesError) throw enquiriesError

            const formattedContacts = (contacts || []).map(c => ({ ...c, type: 'contact' as const }))
            const formattedEnquiries = (enquiries || []).map(e => ({ ...e, type: 'enquiry' as const }))

            setItems([...formattedContacts, ...formattedEnquiries].sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            ))
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateItemStatus = async (
        item: DashboardItem,
        newStatus: Contact['status'] | Enquiry['status']
    ) => {
        try {
            const table = item.type === 'contact' ? 'contacts' : 'quotes'
            const { error } = await supabase
                .from(table)
                .update({ status: newStatus })
                .eq('id', item.id)

            if (error) throw error

            setItems(items.map(i => {
                if (i.id === item.id) {
                    if (i.type === 'contact' && item.type === 'contact') {
                        return { ...i, status: newStatus as Contact['status'] }
                    } else if (i.type === 'enquiry' && item.type === 'enquiry') {
                        return { ...i, status: newStatus as Enquiry['status'] }
                    }
                }
                return i
            }))
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const getStatusIcon = (item: DashboardItem) => {
        if (item.type === 'contact') {
            switch (item.status) {
                case 'new': return <FiMail className={styles.newIcon} />
                case 'read': return <FiCheckCircle className={styles.readIcon} />
                case 'archived': return <FiArchive className={styles.archivedIcon} />
                default: return null
            }
        } else {
            switch (item.status) {
                case 'pending': return <FiClock className={styles.pendingIcon} />
                case 'contacted': return <FiPhone className={styles.contactedIcon} />
                case 'completed': return <FiCheckCircle className={styles.completedIcon} />
                case 'archived': return <FiArchive className={styles.archivedIcon} />
                default: return null
            }
        }
    }

    const filteredItems = items.filter(item => {
        const matchesView = currentView === 'all' || item.type === currentView.slice(0, -1)
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        const searchText = item.type === 'contact'
            ? `${item.name} ${item.number} ${item.subject} ${item.message}`
            : `${item.name} ${item.phone} ${item.service}`
        const matchesSearch = searchText.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesView && matchesStatus && matchesSearch
    })

    const getStats = () => ({
        contacts: items.filter(i => i.type === 'contact').length,
        enquiries: items.filter(i => i.type === 'enquiry').length,
        new: items.filter(i => i.status === 'new' || i.status === 'pending').length,
        inProgress: items.filter(i => i.status === 'read' || i.status === 'contacted').length,
        completed: items.filter(i => i.status === 'completed').length,
        archived: items.filter(i => i.status === 'archived').length
    })

    const stats = getStats()

    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Admin Dashboard</h1>
                    <div className={styles.stats}>
                        <div className={styles.statGroup}>
                            <div className={styles.statItem}>
                                <FiMessageSquare />
                                <span>Total Contacts</span>
                                <strong>{stats.contacts}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <FiPhone />
                                <span>Total Enquiries</span>
                                <strong>{stats.enquiries}</strong>
                            </div>
                        </div>
                        <div className={styles.statGroup}>
                            <div className={styles.statItem}>
                                <FiMail className={styles.newIcon} />
                                <span>New</span>
                                <strong>{stats.new}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <FiCheck className={styles.inProgressIcon} />
                                <span>In Progress</span>
                                <strong>{stats.inProgress}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <FiCheckCircle className={styles.completedIcon} />
                                <span>Completed</span>
                                <strong>{stats.completed}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <FiArchive className={styles.archivedIcon} />
                                <span>Archived</span>
                                <strong>{stats.archived}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.viewToggle}>
                        {(['all', 'contacts', 'enquiries'] as const).map((view) => (
                            <button
                                key={view}
                                className={`${styles.viewButton} ${currentView === view ? styles.active : ''}`}
                                onClick={() => setCurrentView(view)}
                            >
                                {view.charAt(0).toUpperCase() + view.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className={styles.searchAndFilter}>
                        <div className={styles.search}>
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className={styles.filters}>
                            <FiFilter />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                                className={styles.filterSelect}
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.itemsList}>
                        {loading ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                <span>Loading...</span>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className={styles.empty}>
                                <FiSearch size={40} />
                                <p>No items found</p>
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <motion.div
                                    key={`${item.type}-${item.id}`}
                                    layoutId={`${item.type}-${item.id}`}
                                    className={`${styles.itemCard} ${styles[item.status]}`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className={styles.itemHeader}>
                                        <div className={styles.itemType}>
                                            {item.type === 'contact' ? <FiMessageSquare /> : <FiPhone />}
                                            <span>{item.type === 'contact' ? 'Contact' : 'Enquiry'}</span>
                                        </div>
                                        <span className={styles.date}>
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3>{item.name}</h3>

                                    {item.type === 'contact' ? (
                                        <>
                                            <p className={styles.subject}>{item.subject}</p>
                                            <p className={styles.contact}>{item.number}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className={styles.service}>{item.service}</p>
                                            <p className={styles.contact}>{item.phone}</p>
                                        </>
                                    )}
                                    <div className={styles.itemFooter}>
                                        <div className={styles.status}>
                                            {getStatusIcon(item)}
                                            <span>{item.status}</span>
                                        </div>
                                        <div className={styles.actions}>
                                            {item.type === 'contact' ? (
                                                <>
                                                    {item.status === 'new' && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                updateItemStatus(item, 'read')
                                                            }}
                                                            className={styles.actionButton}
                                                            title="Mark as Read"
                                                        >
                                                            <FiCheck />
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {item.status === 'pending' && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                updateItemStatus(item, 'contacted')
                                                            }}
                                                            className={styles.actionButton}
                                                            title="Mark as Contacted"
                                                        >
                                                            <FiPhone />
                                                        </button>
                                                    )}
                                                    {item.status === 'contacted' && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                updateItemStatus(item, 'completed')
                                                            }}
                                                            className={styles.actionButton}
                                                            title="Mark as Completed"
                                                        >
                                                            <FiCheckCircle />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {item.status !== 'archived' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        updateItemStatus(item, 'archived')
                                                    }}
                                                    className={`${styles.actionButton} ${styles.archiveButton}`}
                                                    title="Archive"
                                                >
                                                    <FiArchive />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.modal}
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                        >
                            <button
                                className={styles.closeModal}
                                onClick={() => setSelectedItem(null)}
                            >
                                <FiX />
                            </button>

                            <div className={styles.modalHeader}>
                                <div className={styles.itemType}>
                                    {selectedItem.type === 'contact' ? <FiMessageSquare /> : <FiPhone />}
                                    <h2>{selectedItem.type === 'contact' ? 'Contact Details' : 'Enquiry Details'}</h2>
                                </div>
                                <div className={styles.status}>
                                    {getStatusIcon(selectedItem)}
                                    <span>{selectedItem.status}</span>
                                </div>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.modalSection}>
                                    <h3>Basic Information</h3>
                                    <div className={styles.modalGrid}>
                                        <div className={styles.modalField}>
                                            <label>Name</label>
                                            <span>{selectedItem.name}</span>
                                        </div>
                                        <div className={styles.modalField}>
                                            <label>Contact</label>
                                            <span>{selectedItem.type === 'contact' ? selectedItem.number : selectedItem.phone}</span>
                                        </div>
                                        <div className={styles.modalField}>
                                            <label>Date</label>
                                            <span>{new Date(selectedItem.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedItem.type === 'contact' ? (
                                    <>
                                        <div className={styles.modalSection}>
                                            <h3>Message Details</h3>
                                            <div className={styles.modalField}>
                                                <label>Subject</label>
                                                <span>{selectedItem.subject}</span>
                                            </div>
                                            <div className={styles.modalField}>
                                                <label>Message</label>
                                                <p className={styles.message}>{selectedItem.message}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.modalSection}>
                                        <h3>Service Details</h3>
                                        <div className={styles.modalField}>
                                            <label>Requested Service</label>
                                            <span>{selectedItem.service}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.modalActions}>
                                {selectedItem.type === 'contact' ? (
                                    selectedItem.status === 'new' && (
                                        <button
                                            onClick={() => updateItemStatus(selectedItem, 'read')}
                                            className={styles.actionButton}
                                        >
                                            <FiCheck /> Mark as Read
                                        </button>
                                    )
                                ) : (
                                    <>
                                        {selectedItem.status === 'pending' && (
                                            <button
                                                onClick={() => updateItemStatus(selectedItem, 'contacted')}
                                                className={styles.actionButton}
                                            >
                                                <FiPhone /> Mark as Contacted
                                            </button>
                                        )}
                                        {selectedItem.status === 'contacted' && (
                                            <button
                                                onClick={() => updateItemStatus(selectedItem, 'completed')}
                                                className={styles.actionButton}
                                            >
                                                <FiCheckCircle /> Mark as Completed
                                            </button>
                                        )}
                                    </>
                                )}
                                {selectedItem.status !== 'archived' && (
                                    <button
                                        onClick={() => updateItemStatus(selectedItem, 'archived')}
                                        className={`${styles.actionButton} ${styles.archiveButton}`}
                                    >
                                        <FiArchive /> Archive
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminDashboard