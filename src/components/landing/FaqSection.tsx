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
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className={`border border-border rounded-xl overflow-hidden transition-colors duration-200 ${
      isOpen ? 'bg-surface-1' : 'bg-transparent hover:bg-surface-1/50'
    }`}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      id={`faq-trigger-${index}`}
      className="w-full flex items-center justify-between gap-4 p-5 text-right cursor-pointer"
    >
      <span className="text-text-primary font-medium text-sm md:text-base flex-1">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-primary' : 'text-text-quaternary'}`} />
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
          <p className="px-5 pb-5 text-text-secondary leading-relaxed text-sm">
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
          <span className="inline-block px-3 py-1 rounded-lg bg-surface-2 border border-border text-primary text-xs font-medium mb-6 tracking-wide uppercase">
            الأسئلة الشائعة
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            كل ما تحتاج معرفته
          </h2>
          <p className="text-base text-text-secondary">
            إجابات على أكثر الأسئلة شيوعاً حول مايكرو موف
          </p>
        </motion.div>

        <div className="space-y-2">
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
