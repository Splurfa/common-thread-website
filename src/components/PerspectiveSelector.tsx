import React, { useState } from 'react';

type PerspectiveRole = 'owner' | 'manager' | 'teamMember' | null;

interface PerspectiveContent {
  owner: React.ReactNode;
  manager: React.ReactNode;
  teamMember: React.ReactNode;
}

interface PerspectiveSelectorProps {
  perspectives: PerspectiveContent;
}

const roleLabels: Record<Exclude<PerspectiveRole, null>, string> = {
  owner: 'The Owner',
  manager: 'The Manager',
  teamMember: 'The Team Member'
};

export function PerspectiveSelector({ perspectives }: PerspectiveSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<PerspectiveRole>(null);

  const handleRoleClick = (role: PerspectiveRole) => {
    // Toggle: click same role to collapse, click different to switch
    setSelectedRole(prev => prev === role ? null : role);
  };

  const roles: Exclude<PerspectiveRole, null>[] = ['owner', 'manager', 'teamMember'];

  return (
    <div className="space-y-6">
      {/* GEMINI: Replace this placeholder with cascade visualization */}
      {/* Requirements:
          - 3 nodes in vertical cascade: Owner → Manager → Team Member
          - Connections between nodes stay visible when expanded
          - Dark theme, Playfair Display for labels, JetBrains Mono for small text
          - Click any node → that perspective expands
          - Physics-based or smooth animation preferred
      */}
      <div className="cascade-placeholder">
        <div className="flex flex-col items-center gap-2">
          {roles.map((role, index) => (
            <React.Fragment key={role}>
              {/* Node */}
              <button
                onClick={() => handleRoleClick(role)}
                className={`
                  px-6 py-3 rounded-lg border transition-all duration-300
                  font-serif text-sm
                  ${selectedRole === role
                    ? 'bg-white/10 border-white/40 text-white'
                    : 'bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                  }
                `}
              >
                {roleLabels[role]}
              </button>

              {/* Connection line (except after last) */}
              {index < roles.length - 1 && (
                <div className={`
                  w-px h-4 transition-all duration-300
                  ${selectedRole ? 'bg-white/30' : 'bg-white/20'}
                `} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Expanded perspective content */}
      {selectedRole && (
        <div className="pt-4 border-t border-white/10 animate-fadeIn">
          <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
            {roleLabels[selectedRole]}
          </div>
          <div className="text-white/90 leading-relaxed">
            {perspectives[selectedRole]}
          </div>
        </div>
      )}

      {/* Instruction hint when collapsed */}
      {!selectedRole && (
        <p className="text-center text-white/40 text-sm font-mono">
          Click a role to see their perspective
        </p>
      )}
    </div>
  );
}
