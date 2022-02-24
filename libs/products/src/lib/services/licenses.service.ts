import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { License } from '../models/license';
import { IConfirmOrderRequest } from '../models/requests/IConfirmOrderRequest';
@Injectable({ providedIn: 'root' })
export class LicensesService {
  private apiURLLicenses = environment.apiUrl + 'licences';
  constructor(private http: HttpClient) {}
  public getLicenses(productId: string): Observable<License[]> {
    const url = `${this.apiURLLicenses}/${productId}/all`;
    return this.http.get<License[]>(url);
  }
  public getLicense(licenseId: string): Observable<License> {
    const url = `${this.apiURLLicenses}/${licenseId}`;
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
  public updateLicenses(requestBody: IConfirmOrderRequest): Observable<any> {
    const url = `${this.apiURLLicenses}/edit/many/order`;
    return this.http.put<any>(url, requestBody);
  }
  public deleteLicense(licenseId: string): Observable<any> {
    const url = `${this.apiURLLicenses}/${licenseId}`;
    return this.http.delete<any>(url);
  }
}
