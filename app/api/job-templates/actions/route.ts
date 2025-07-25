import { NextRequest, NextResponse } from 'next/server';
import { fetchLegacyModel } from '@/lib/fetchLegacyModel';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') ?? '';
  
  try {
    const body = await req.json();
    const { action, selectedIds, searchParams } = body;
    
    if (!action || !selectedIds || !Array.isArray(selectedIds)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected action and selectedIds array.' },
        { status: 400 }
      );
    }
    
    // Build the selected_row parameter as comma-separated IDs (legacy format)
    const selectedRowParam = selectedIds.join(',');
    
    // Determine the event based on action
    let event = '';
    switch (action) {
      case 'archive':
        event = 'com.deploy.application.twm.plugin.JobTool.archiveMany';
        break;
      case 'activate':
        event = 'com.deploy.application.twm.plugin.JobTool.activateMany';
        break;
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
    
    // Build query string for legacy system with mass action parameters
    const qs = `?seq=autoTemplate&viewPlugin=jobTool.list&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US` +
      `&event=${encodeURIComponent(event)}` +
      `&selected_row=${encodeURIComponent(selectedRowParam)}` +
      `&keywords=${encodeURIComponent(searchParams?.keywords || '')}` +
      `&keywordsCriteria=${encodeURIComponent(searchParams?.keywordsCriteria || '')}` +
      `&selectedCategory=${encodeURIComponent(searchParams?.selectedCategory || '')}` +
      `&sortColumn=${encodeURIComponent(searchParams?.sortColumn || 'dateLastModified')}` +
      `&sortDirection=${encodeURIComponent(searchParams?.sortDirection || 'desc')}` +
      `&reqCreateFromJob=${encodeURIComponent(searchParams?.reqCreateFromJob || 'false')}`;
    
    const model = await fetchLegacyModel(qs, cookie);
    
    // Handle redirect responses (legacy system redirects after mass actions)
    if (model.redirect) {
      return NextResponse.json({ 
        success: true, 
        redirect: model.redirect,
        message: `Successfully ${action}d ${selectedIds.length} job template(s)`
      });
    }
    
    // If no redirect, assume success
    const response = NextResponse.json({ 
      success: true,
      message: `Successfully ${action}d ${selectedIds.length} job template(s)`
    });
    
    // Forward any session cookies from legacy system
    const setCookie = req.headers.get('set-cookie');
    if (setCookie) {
      response.headers.set('set-cookie', setCookie);
    }
    
    return response;
    
  } catch (error) {
    console.error('Error performing mass action:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to perform mass action', message: errorMessage },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}
