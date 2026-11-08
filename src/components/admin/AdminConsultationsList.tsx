import React, { useState } from 'react';
import { useStore } from '../../services/store';
import { Consultation, Prescription } from '../../types';
import { PrintablePrescription } from '../common/PrintablePrescription';
import { Stethoscope, Search, Calendar, FileText, Printer, CheckCircle2 } from 'lucide-react';

export const AdminConsultationsList: React.FC = () => {
  const { consultations, patients, doctors, prescriptions } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const filteredConsultations = consultations.filter((cs) =>
    `${cs.code} ${cs.patientName} ${cs.doctorName} ${cs.diagnosis} ${cs.treatment}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#00796F] uppercase tracking-wider">
            Actes Médicaux & Comptes Rendus
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#101513] tracking-tight mt-0.5">
            Registre Central des Consultations
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Archivage exhaustif de tous les actes cliniques clôturés au sein de la clinique OSIRIX.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold font-mono bg-[#E8F5EF] text-[#00796F] px-3.5 py-1.5 rounded-xl border border-teal-200">
          <span>{consultations.length} acte(s) archivé(s)</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par patient, médecin, diagnostic, code consultation..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-300"
          />
        </div>
      </div>

      {/* Consultations Cards / Table */}
      <div className="space-y-4">
        {filteredConsultations.map((cs) => {
          const associatedPrescription = prescriptions.find((p) => p.consultationId === cs.id || p.id === cs.prescriptionId);
          return (
            <div
              key={cs.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 hover:border-[#00796F] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-extrabold text-[#00796F] bg-[#E8F5EF] px-2.5 py-0.5 rounded-lg">
                    {cs.code}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{cs.patientName}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-[#073D38] font-semibold">{cs.doctorName} ({cs.specialtyName})</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cs.date} à {cs.time}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Clôturée
                  </span>
                </div>
              </div>

              {/* Vitals strip */}
              {cs.vitals && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-[#F3F5F4] p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-sans">Tension Artérielle</span>
                    <strong className="text-slate-800">{cs.vitals.bloodPressure || 'N/A'} mmHg</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-sans">Pouls</span>
                    <strong className="text-slate-800">{cs.vitals.pulse} bpm</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-sans">Température</span>
                    <strong className="text-slate-800">{cs.vitals.temperature}°C</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-sans">Poids</span>
                    <strong className="text-slate-800">{cs.vitals.weight} kg</strong>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Observations cliniques :</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{cs.clinicalObservations}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#E8F5EF] border border-teal-200">
                  <span className="font-extrabold text-[#073D38] block text-[11px] uppercase tracking-wider">
                    Diagnostic Médical :
                  </span>
                  <p className="text-[#073D38] font-bold mt-0.5">{cs.diagnosis}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block">Traitement prescrit :</span>
                  <p className="text-slate-600 mt-0.5">{cs.treatment}</p>
                </div>

                {cs.examsRequested && cs.examsRequested.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-800 block">Examens complémentaires prescrits :</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {cs.examsRequested.map((ex, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 text-[11px] font-medium">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {associatedPrescription && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Ordonnance générée : <strong className="font-mono text-slate-800">{associatedPrescription.code}</strong> ({associatedPrescription.medications.length} médicament(s))
                  </span>
                  <button
                    onClick={() => setSelectedPrescription(associatedPrescription)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#00796F] hover:bg-[#073D38] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer l'ordonnance</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Printable */}
      {selectedPrescription && (
        <PrintablePrescription
          prescription={selectedPrescription}
          patient={patients.find((p) => p.id === selectedPrescription.patientId)}
          doctor={doctors.find((d) => d.id === selectedPrescription.doctorId)}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </div>
  );
};
