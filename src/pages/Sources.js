// utils
import { useFirebaseOnce } from "utils/hooksHelper"
// constants
import { buildColumns } from "constant/columns"
import { db } from "constant/firebase"
import { SPREADSHEET_KEY } from "constant/static"
// components
import Table from "components/Table"

const columns = ["Category", "Info", "Link"]

const Sources = (props) => {
  const dbRef = db.ref(`${SPREADSHEET_KEY}/sources`)

  const { data, loading } = useFirebaseOnce(dbRef)
  // Displays a table by default
  return (
    <div className="page-content">
      <Table
        dataSource={data}
        columns={buildColumns(columns)}
        loading={loading}
      />
    </div>
  )
}
export default Sources
