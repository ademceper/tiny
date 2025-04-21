import { db } from '@/lib/db';
import { OrganizationRequest } from '../schemas/organizationSchema'; 

export class OrganizationService {
  static async createOrganization(data: OrganizationRequest) {
    const existingOrg = await db.organization.findUnique({
      where: {
        name: data.name,
      },
    });
  
    if (existingOrg) {
      throw new Error('An organization with this name already exists');
    }
  
    return await db.organization.create({
      data: {
        name: data.name,
        domain: data.domain ?? null, 
      }
    });
  }
  
  static async updateOrganization(
    id: string,
    data: Partial<OrganizationRequest>
  ) {
    if (data.name) {
      const existingOrg = await db.organization.findFirst({
        where: {
          name: data.name,
          NOT: {
            id: id, 
          },
        },
      });
  
      if (existingOrg) {
        throw new Error('An organization with this name already exists');
      }
    }
  
    return await db.organization.update({
      where: { id },
      data: {
        name: data.name,
        domain: data.domain ?? undefined, 
      }
    });
  }
  
  static async deleteOrganization(id: string) {
    return await db.organization.delete({
      where: { id }
    });
  }

  static async getAllOrganizations() {
    return await db.organization.findMany();
  }

  static async getOrganizationById(id: string) {
    return await db.organization.findUnique({
      where: { id }
    });
  }
}
