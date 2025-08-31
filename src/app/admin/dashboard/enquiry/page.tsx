import ContactDashboard from "@/admin/dashboard/contactdashboard/ContactDashboard"
import QuoteDashboard from "@/admin/dashboard/enquirydashboard/EnquiryDashboard"


export const metadata = {
  title: 'Quote Dashboard | Ditvi Technologies',
  description: 'Quote management dashboard'
}

export default function ContactPage() {
    return <QuoteDashboard />
}
