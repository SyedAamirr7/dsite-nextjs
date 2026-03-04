'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

type DnsType = '' | 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX' | 'NS' | 'PTR' | 'SRV';

const TTL_OPTIONS = [
  { value: '1', labelKey: 'settings.auto' as const },
  { value: '120', labelKey: null },
  { value: '300', labelKey: null },
  { value: '1800', labelKey: null },
  { value: '3000', labelKey: null },
  { value: '3600', labelKey: null },
  { value: '6000', labelKey: null },
  { value: '14400', labelKey: null },
  { value: '86400', labelKey: null },
];

export default function DomainEditPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [dnsType, setDnsType] = useState<DnsType>('');
  const [ttl, setTtl] = useState('1');
  const [name, setName] = useState('');
  const [ipv4, setIpv4] = useState('');
  const [ipv6, setIpv6] = useState('');
  const [mailServer, setMailServer] = useState('');
  const [nameServer, setNameServer] = useState('');
  const [domainName, setDomainName] = useState('');
  const [content, setContent] = useState('');
  const [target, setTarget] = useState('');
  const [service, setService] = useState('');
  const [port, setPort] = useState('');
  const [weight, setWeight] = useState('');
  const [proto, setProto] = useState('_tcp');
  const [priority, setPriority] = useState('');

  const showName = dnsType !== '';
  const showA = dnsType === 'A';
  const showAAAA = dnsType === 'AAAA';
  const showCnameOrSrvTarget = dnsType === 'CNAME' || dnsType === 'SRV';
  const showTxt = dnsType === 'TXT';
  const showMx = dnsType === 'MX';
  const showNs = dnsType === 'NS';
  const showPtr = dnsType === 'PTR';
  const showSrv = dnsType === 'SRV';
  const showPriority = dnsType === 'MX' || dnsType === 'SRV';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add DNS record', { dnsType, ttl, name, ipv4, ipv6, mailServer, nameServer, domainName, content, target, service, port, weight, proto, priority });
    router.push('/settings/domain');
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.domain')} activeItem="domain">
        <SettingsConfigTabs activeTab="domain" />
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-right mb-4">
                    <Link href="/acp/settings/domain" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('settings.backToDomain')}
                    </Link>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="mb-5 text-start">
                        <h2 className="card-title m-0 p-0">{t('settings.addPageDns')}</h2>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('common.type')}</label>
                          </div>
                          <div className="col-lg-6">
                            <select
                              name="type"
                              id="dnsType"
                              className="form-control"
                              value={dnsType}
                              onChange={(e) => setDnsType(e.target.value as DnsType)}
                            >
                              <option value="" disabled>{t('common.type')}</option>
                              <option value="A">A</option>
                              <option value="AAAA">AAAA</option>
                              <option value="CNAME">CNAME</option>
                              <option value="TXT">TXT</option>
                              <option value="MX">MX</option>
                              <option value="NS">NS</option>
                              <option value="PTR">PTR</option>
                              <option value="SRV">SRV</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('settings.ttl')}</label>
                          </div>
                          <div className="col-lg-6">
                            <select name="ttl" className="form-control" value={ttl} onChange={(e) => setTtl(e.target.value)}>
                              {TTL_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.labelKey ? t(opt.labelKey) : opt.value}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {showName && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">{t('common.name')}</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t('common.name')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showA && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">ipv4</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="IP"
                                value={ipv4}
                                onChange={(e) => setIpv4(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showAAAA && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">ipv6</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="IP"
                                value={ipv6}
                                onChange={(e) => setIpv6(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showMx && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">Edit</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Mail server"
                                value={mailServer}
                                onChange={(e) => setMailServer(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showNs && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">NameEdit</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name server"
                                value={nameServer}
                                onChange={(e) => setNameServer(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showPtr && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">Name Domain</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Domain name"
                                value={domainName}
                                onChange={(e) => setDomainName(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showTxt && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">Type</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Target"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showSrv && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">Service</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Service"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showCnameOrSrvTarget && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">Target</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Target"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showSrv && (
                          <>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4">
                                <label className="form-label">Of</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Port"
                                  value={port}
                                  onChange={(e) => setPort(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4">
                                <label className="form-label">Weight</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Weight"
                                  value={weight}
                                  onChange={(e) => setWeight(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4">
                                <label className="form-label">All</label>
                              </div>
                              <div className="col-lg-6">
                                <select className="form-control" value={proto} onChange={(e) => setProto(e.target.value)}>
                                  <option value="_tcp">TCP</option>
                                  <option value="_udp">UDP</option>
                                  <option value="_tls">TLS</option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}

                        {showPriority && (
                          <div className="form-group row">
                            <div className="col-lg-2 col-md-4">
                              <label className="form-label">NoAllity</label>
                            </div>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <div className="text-left mt-4" dir="rtl">
                          <button type="submit" className="btn btn-primary px-5">
                            {t('common.save')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
      </AcpPage>
    </>
  );
}
