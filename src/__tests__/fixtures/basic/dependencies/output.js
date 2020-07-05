function _dependencies() { _child() || _child2(); }

;

function _child2() { _grandchild(); }

;

function _grandchild() { return "grandchild"; }

;

function _child() { return "child"; }

;