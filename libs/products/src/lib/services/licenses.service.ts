import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { License } from '../models/license';
@Injectable({ providedIn: 'root' })
export class LicensesService {
  private apiURLLicenses = environment.apiUrl + 'licences';
  constructor(private http: HttpClient) {}
  public getLicenses(productId: string): Observable<License[]> {
    const url = `${this.apiURLLicenses}/${productId}`;
    return this.http.get<License[]>(url);
  }
  public getLicense(productId: string, licenseId: string): Observable<License> {
    const url = `${this.apiURLLicenses}/${productId}/${licenseId}`;
    return this.http.get<License>(url);
  }
  public createLicense(license: License): Observable<License> {
    const url = `${this.apiURLLicenses}/new`;
    return this.http.post<License>(url, license);
  }
  public updateLicense(license: License): Observable<License> {
    const url = `${this.apiURLLicenses}/edit/${license.id}`;
    return this.http.put<License>(url, license);
  }
  public deleteLicense(licenseId: string): Observable<any> {
    const url = `${this.apiURLLicenses}/${licenseId}`;
    return this.http.delete<any>(url);
  }
}
