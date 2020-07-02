function _dependencies() { cild1() || _child2(); }

;

function _child2() { _grandchild(); }

;

function _grandchild() { return "grandchild"; }

;

function _child() { return "child1"; }

;