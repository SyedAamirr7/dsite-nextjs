'use client';

import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

export default function ClientsEditMultiplePage() {
  const { t } = useTranslation();
  return (
    <>
      <AcpPage pageTitle={t('clientsApp.addMultipleTitle')} activeItem="clients">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-left mb-4 d-flex align-items-center gap-3">
              <Link href="/acp/clients" className="btn btn-light border">
                <i className="fas fa-arrow-left mr-2"></i>
                {t('clientsApp.backToClients')}
              </Link>
            </div>
            <div className="card">
              <div className="card-body text-center py-5">
                <p className="text-muted mb-0">{t('clientsApp.addMultipleDescription')}</p>
                <p className="text-muted small mt-2">{t('clientsApp.addOneByOne')} <Link href="/acp/clients/edit">{t('common.addPage')}</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </AcpPage>
    </>
  );
}
