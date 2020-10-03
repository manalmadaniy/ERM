import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { IRisqueAnalyse, RisqueAnalyse } from 'app/shared/model/risque-analyse.model';

describe('Service Tests', () => {
  describe('RisqueAnalyse Service', () => {
    let injector: TestBed;
    let service: RisqueAnalyseService;
    let httpMock: HttpTestingController;
    let elemDefault: IRisqueAnalyse;
    let expectedResult: IRisqueAnalyse | IRisqueAnalyse[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RisqueAnalyseService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new RisqueAnalyse(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RisqueAnalyse', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RisqueAnalyse()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RisqueAnalyse', () => {
        const returnedFromService = Object.assign(
          {
            risqueCause: 'BBBBBB',
            typeCause: 'BBBBBB',
            risqueCons: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RisqueAnalyse', () => {
        const returnedFromService = Object.assign(
          {
            risqueCause: 'BBBBBB',
            typeCause: 'BBBBBB',
            risqueCons: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RisqueAnalyse', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
