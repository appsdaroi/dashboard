import { UsersTable } from "../../components/users/table.component"

export default async function Profile() {
    return (
      <section className="max-w-5xl min-h-screen pt-20 mx-auto">
        <UsersTable />
      </section>
    );
}