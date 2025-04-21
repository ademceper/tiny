import { createOrganization, updateOrganization, deleteOrganization, getAllOrganizations, getOrganizationById } from "@/app/modules/controllers/organizationsController";

export async function POST(req: Request) {
  return await createOrganization(req);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); 

  if (id) {
    return await getOrganizationById(id);
  } else {
    return await getAllOrganizations();
  }
}

export async function PUT(req: Request) {
  return await updateOrganization(req);
}

export async function DELETE(req: Request) {
  return await deleteOrganization(req);
}
