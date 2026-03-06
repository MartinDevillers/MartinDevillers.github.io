import Image from "next/image"

interface ProjectSummaryProps {
  client: string
  logo: string
  role: string
  date: string
  location: string
  country: string
}

interface CellProps {
  label: string
  value: React.ReactNode
  icon: React.ReactNode
}

const Cell: React.FC<CellProps> = ({ label, value, icon }) => (
  <div className="relative rounded-xl border border-zinc-200/80 p-4 pr-16 dark:border-zinc-800/80">
    <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</p>
    <div className="min-w-0 text-base font-medium text-zinc-900 dark:text-zinc-100">{value}</div>
    <div className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</div>
  </div>
)

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ client, logo, role, date, location, country }) => (
  <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <Cell
      label="Client"
      value={client}
      icon={
        <div className="relative h-10 w-10 rounded-full">
          <Image src={logo} alt={client} fill className="rounded-full object-contain" />
        </div>
      }
    />
    <Cell
      label="Role"
      value={role}
      icon={
        <span role="img" aria-label="Software engineer" className="text-4xl leading-none">
          👨‍💻
        </span>
      }
    />
    <Cell
      label="Date"
      value={date}
      icon={
        <span role="img" aria-label="Calendar" className="text-4xl leading-none">
          📅
        </span>
      }
    />
    <Cell
      label="Location"
      value={location}
      icon={
        <span role="img" aria-label={location} className="text-4xl leading-none">
          {country}
        </span>
      }
    />
  </div>
)

export default ProjectSummary
