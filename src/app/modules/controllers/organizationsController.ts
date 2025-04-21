import { NextResponse } from 'next/server';
import { OrganizationService } from '../services/organizationService';
import { response } from '@/lib/apiResponse';

export async function createOrganization(req: Request) {
  const start = Date.now();

  try {
    const body = await req.json();
    const organization = await OrganizationService.createOrganization(body);
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        true,
        'Organization created successfully',
        201,
        { organization },
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred while creating the organization',
        500,
        undefined,
        {
          code: 'CREATE_ORG_ERROR',
          message: error.message,
          category: 'system',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  }
}

export async function updateOrganization(req: Request) {
  const start = Date.now(); 

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const organization = await OrganizationService.updateOrganization(id, updateData);
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        true,
        'Organization updated successfully',
        200,
        { organization },
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred while updating the organization',
        500,
        undefined,
        {
          code: 'UPDATE_ORG_ERROR',
          message: error.message,
          category: 'system',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  }
}

export async function deleteOrganization(req: Request) {
  const start = Date.now(); 

  try {
    const { id } = await req.json();

    await OrganizationService.deleteOrganization(id);
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        true,
        'Organization deleted successfully',
        200,
        undefined,
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred while deleting the organization',
        500,
        undefined,
        {
          code: 'DELETE_ORG_ERROR',
          message: error.message,
          category: 'system',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  }
}

export async function getAllOrganizations() {
  const start = Date.now(); 

  try {
    const organizations = await OrganizationService.getAllOrganizations();
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        true,
        'Organizations fetched successfully',
        200,
        { organizations },
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred while fetching organizations',
        500,
        undefined,
        {
          code: 'FETCH_ORGS_ERROR',
          message: error.message,
          category: 'system',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  }
}

export async function getOrganizationById(id: string) {
  const start = Date.now();

  try {
    const organization = await OrganizationService.getOrganizationById(id);
    const processingTime = Date.now() - start;

    if (!organization) {
      return NextResponse.json(
        response(
          false,
          'Organization not found',
          404,
          undefined,
          { code: 'ORG_NOT_FOUND', message: 'Organization not found' },
          undefined,
          undefined,
          { processingTime, dataType: 'JSON' }
        )
      );
    }

    return NextResponse.json(
      response(
        true,
        'Organization fetched successfully',
        200,
        { organization },
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred while fetching the organization',
        500,
        undefined,
        {
          code: 'FETCH_ORG_ERROR',
          message: error.message,
          category: 'system',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' }
      )
    );
  }
}
