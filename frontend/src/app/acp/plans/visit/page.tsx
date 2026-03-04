'use client';

import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanCard {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceUnit: string;
  description: string;
  trialBadge: string;
  features: PlanFeature[];
}

const CHECK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="check-plan bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
);

const CROSS_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="close-plan bi bi-x-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
  </svg>
);

const VISIT_PLANS: PlanCard[] = [
  {
    id: 'basic',
    title: 'basic',
    subtitle: 'most popular',
    price: '1050.58',
    priceUnit: 'MyThe/Year',
    description: 'Add Page Complete',
    trialBadge: '30 Day Trial',
    features: [
      { text: 'Minimum deposit 1,000', included: true },
      { text: 'Maximum deposit 20,000', included: true },
      { text: 'Customer support 24/7', included: true },
      { text: 'Instant withdrawal', included: true },
      { text: 'Rewards/Bonus', included: false },
      { text: 'Free e-book', included: false },
    ],
  },
  {
    id: 'professional',
    title: 'professional',
    subtitle: 'recommended',
    price: '1150',
    priceUnit: 'MyThe/Year',
    description: 'Add Page Complete',
    trialBadge: '30 Day Trial',
    features: [
      { text: 'Minimum deposit 1,000', included: true },
      { text: 'Maximum deposit 20,000', included: true },
      { text: 'Customer support 24/7', included: true },
      { text: 'Instant withdrawal', included: true },
      { text: 'Rewards/Bonus', included: false },
      { text: 'Free e-book', included: false },
    ],
  },
  {
    id: 'ultimate',
    title: 'ultimate',
    subtitle: 'best value',
    price: '2000',
    priceUnit: 'MyThe/Year',
    description: 'Add Page Complete',
    trialBadge: '30 Day Trial',
    features: [
      { text: 'Minimum deposit 1,000', included: true },
      { text: 'Maximum deposit 20,000', included: true },
      { text: 'Customer support 24/7', included: true },
      { text: 'Instant withdrawal', included: true },
      { text: 'Rewards/Bonus', included: false },
      { text: 'Free e-book', included: false },
    ],
  },
];

export default function PlansVisitPage() {
  const { t } = useTranslation();

  return (
    <>
      <AcpPage pageTitle={t('plans.title')} activeItem="plans">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/plans" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('plans.backToPlansList')}
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="row plan_cards justify-content-center">
                  {VISIT_PLANS.map((plan) => (
                    <div key={plan.id} className="col-xl-4 col-md-6 mt-4">
                      <div className="card plan_card py-5 px-4 h-100">
                        <article className="d-flex align-items-center flex-column gap-4">
                          <div className="d-flex flex-column align-items-center mb-3">
                            <h2 className="plan_card-title mb-0">{plan.title}</h2>
                            <p className="plan_card-subtitle mb-0 mt-2 text-blue bg-light px-3 py-1 rounded">
                              {plan.subtitle}
                            </p>
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h2 className="plan_card-title mb-0 text-blue">
                              {plan.price}
                              <span className="text-black"> {plan.priceUnit} </span>
                            </h2>
                            <p className="plan_card-subtitle text-light-gray mb-0 mt-2" style={{ fontSize: '14px' }}>
                              {plan.description}
                            </p>
                          </div>
                        </article>
                        <div className="mx-auto mt-4">
                          <span className="plan_card-badge badge text-success text-bg-success">
                            {plan.trialBadge}
                          </span>
                        </div>
                        <ul className="plan_card-list d-flex flex-column align-items-start gap-4 p-0 my-4">
                          {plan.features.map((f, i) => (
                            <li key={i} className="d-flex align-items-center">
                              {f.included ? CHECK_ICON : CROSS_ICON}
                              <span className="mx-2">{f.text}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-4">
                          <Link
                            href="#"
                            className="submit-plan btn btn-primary w-100 text-capitalize"
                            onClick={(e) => e.preventDefault()}
                          >
                            {t('plans.getStarted')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
      </AcpPage>
    </>
  );
}
