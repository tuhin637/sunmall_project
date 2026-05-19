export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  isBlocked: boolean
  avatar: string
}

export const defaultCustomers: Customer[] = [
  { id: 'c1', name: 'Arif Rahman', email: 'arif@email.com', phone: '+880 1711-234567', address: '45 Dhanmondi, Dhaka', totalOrders: 8, totalSpent: 210.50, joinDate: '2024-06-15', isBlocked: false, avatar: 'AR' },
  { id: 'c2', name: 'Nusrat Jahan', email: 'nusrat@email.com', phone: '+880 1812-345678', address: '12 Gulshan-2, Dhaka', totalOrders: 5, totalSpent: 142.30, joinDate: '2024-07-22', isBlocked: false, avatar: 'NJ' },
  { id: 'c3', name: 'Rakib Hossain', email: 'rakib@email.com', phone: '+880 1911-456789', address: '78 Uttara, Dhaka', totalOrders: 12, totalSpent: 380.00, joinDate: '2024-05-10', isBlocked: false, avatar: 'RH' },
  { id: 'c4', name: 'Sadia Islam', email: 'sadia@email.com', phone: '+880 1612-567890', address: '23 Bashundhara, Dhaka', totalOrders: 3, totalSpent: 89.70, joinDate: '2024-09-01', isBlocked: false, avatar: 'SI' },
  { id: 'c5', name: 'Tanvir Ahmed', email: 'tanvir@email.com', phone: '+880 1511-678901', address: '56 Mirpur-10, Dhaka', totalOrders: 6, totalSpent: 195.40, joinDate: '2024-08-14', isBlocked: true, avatar: 'TA' },
  { id: 'c6', name: 'Farida Begum', email: 'farida@email.com', phone: '+880 1711-789012', address: '90 Mohammadpur, Dhaka', totalOrders: 9, totalSpent: 267.80, joinDate: '2024-04-28', isBlocked: false, avatar: 'FB' },
  { id: 'c7', name: 'Jahidul Islam', email: 'jahid@email.com', phone: '+880 1811-890123', address: '34 Wari, Dhaka Old', totalOrders: 2, totalSpent: 55.20, joinDate: '2024-11-05', isBlocked: false, avatar: 'JI' },
]
