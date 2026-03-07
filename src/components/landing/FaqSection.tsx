import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'ما هو مايكرو موف؟',
    answer:
      'مايكرو موف هو منصة ذكية تستخدم الذكاء الاصطناعي لتقديم تنبيهات حركية مخصصة للموظفين أثناء ساعات العمل. الهدف هو مكافحة أضرار الجلوس المطوّل وتحسين صحة وإنتاجية الفريق.',
  },
  {
    question: 'كيف يعمل نظام التنبيهات الذكية؟',
    answer:
      'يحلل الذكاء الاصطناعي جدول الموظف واجتماعاته وأنماط عمله ليقدم تنبيهات في الأوقات المناسبة. التنبيهات تكون واعية بالسياق — لن تقاطعك أثناء اجتماع مهم، بل تنتظر اللحظة المثالية.',
  },
  {
    question: 'هل يمكن تخصيص التمارين والأنشطة؟',
    answer:
      'نعم! يمكن للمسؤولين إضافة وتعديل الأنشطة والتمارين بما يتناسب مع بيئة العمل. كما يتعلم النظام تفضيلات كل موظف مع مرور الوقت ليقدم اقتراحات أكثر ملاءمة.',
  },
  {
    question: 'كيف يعمل نظام النقاط والمكافآت؟',
    answer:
      'يكسب الموظفون نقاطاً عند إتمام التمارين والأنشطة. يمكن استبدال هذه النقاط بمكافآت يحددها المسؤول مثل إجازات إضافية أو قسائم شرائية أو هدايا. النظام يشمل أيضاً لوحة متصدرين وتحديات جماعية.',
  },
  {
    question: 'هل مايكرو موف آمن وخاص؟',
    answer:
      'بالتأكيد. نلتزم بأعلى معايير الأمان والخصوصية. البيانات مشفرة بالكامل ولا نشارك أي معلومات شخصية مع أطراف ثالثة. كل موظف يتحكم في إعدادات خصوصيته.',
  },
  {
    question: 'هل يتكامل مع أنظمتنا الحالية؟',
    answer:
      'في خطة المؤسسات، نوفر تكاملاً مع أنظمة الموارد البشرية الشائعة وتقويمات العمل (Google Calendar، Microsoft Teams) وأدوات التواصل المختلفة.',
  },
];

const FaqItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ question, answer, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className={`border border-white/10 rounded-2xl overflow-hidden transition-colors ${
      isOpen ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.02]'
    }`}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      id={`faq-trigger-${index}`}
      className="w-full flex items-center justify-between gap-4 p-6 text-right"
    >
      <span className="text-white font-semibold text-base md:text-lg flex-1">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary' : 'text-slate-500'}`} />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-trigger-${index}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-slate-400 leading-relaxed text-sm md:text-base">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            الأسئلة الشائعة
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            كل ما تحتاج معرفته
          </h2>
          <p className="text-lg text-slate-400">
            إجابات على أكثر الأسئلة شيوعاً حول مايكرو موف
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
