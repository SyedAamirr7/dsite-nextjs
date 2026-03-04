'use client';

import { useEffect, useCallback } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useTranslation } from '@/hooks/useTranslation';

export default function Dashboard() {
  const { t } = useTranslation();

  const initCharts = useCallback(() => {
    if (typeof window === 'undefined' || !(window as any).Chart) {
      return;
    }

    const doughnutCanvas = document.getElementById("doughnut");
    if (doughnutCanvas) {
      const doughnutData = {
        labels: ["Iphone", "Computer", "Android"],
        datasets: [
          {
            data: [300, 50, 100],
            borderColor: ["#24AEFC", "#43E0AA", "#935CCB"],
            backgroundColor: ["#24AEFC", "#43E0AA", "#935CCB"],
            hoverOffset: 4,
          },
        ],
      };
      const doughnutConfig = {
        type: "doughnut",
        data: doughnutData,
        options: {
          plugins: {
            title: { display: true, text: t('dashboard.websiteStatistics') },
          },
          weight: "2px",
        },
      };
      new (window as any).Chart(doughnutCanvas, doughnutConfig);
    }

    const lineCanvas = document.getElementById("line");
    if (lineCanvas) {
      const lineData = {
        labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          { label: t('dashboard.visitors'), data: [65, 59, 80, 81, 56, 55, 40], fill: false, pointRadius: 4, borderColor: "#43E0AA", backgroundColor: "#43E0AA", borderJoinStyle: "round", tension: 0.3 },
          { label: t('dashboard.pageViews'), data: [45, 79, 90, 41, 96, 15, 30], fill: false, pointRadius: 4, borderColor: "#935CCB", backgroundColor: "#935CCB", borderJoinStyle: "round", tension: 0.3 },
        ],
      };
      const lineConfig = {
        type: "line",
        data: lineData,
        options: {
          plugins: {
            title: { display: true, text: t('dashboard.chartLastWeek') },
          },
        },
      };
      new (window as any).Chart(lineCanvas, lineConfig);
    }
  }, [t]);

  useEffect(() => {
    const timer = setTimeout(() => initCharts(), 500);
    return () => clearTimeout(timer);
  }, [initCharts]);

  return (
    <>
      <DashboardLayout
        pageTitle={t('dashboard.controlDashboard')}
        activeItem="home"
        topBanner={
          <div className="alert alert-warning domain-expired-alert d-flex align-items-center flex-wrap gap-4">
            <p className="mb-0">{t('dashboard.domainExpiredNote')}</p>
            <Link href="/acp/settings/subscriptions">{t('dashboard.selectPlan')}</Link>
          </div>
        }
      >
            <div className="page-content-wrapper">
              <div className="row chart-card">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-head">
                      <h2 className="title">{t('dashboard.statistics')}</h2>
                    </div>
                    <div className="card-body">
                      <canvas id="doughnut"></canvas>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-head">
                      <h2 className="title">{t('dashboard.analytics')}</h2>
                    </div>
                    <div className="card-body">
                      <canvas id="line"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </DashboardLayout>

      {/* External Scripts */}
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" strategy="beforeInteractive" />
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap4.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.datatables.net/rowreorder/1.2.8/js/dataTables.rowReorder.min.js" strategy="lazyOnload" />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.4.1/chart.min.js" 
        strategy="lazyOnload"
        onLoad={initCharts}
      />
      
      {/* Local Scripts */}
      <Script src="/assets/js/custom.js" strategy="lazyOnload" />
      <Script src="/assets/js/filter-domains.js" strategy="lazyOnload" />
      <Script src="/assets/js/settings.js" strategy="lazyOnload" />
      <Script src="/assets/js/language-switcher.js" strategy="lazyOnload" />
    </>
  );
}
